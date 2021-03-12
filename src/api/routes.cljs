(ns api.routes
  (:require
    [bidi.bidi :as bidi]
    [taoensso.timbre :refer [info]]
    [broker.catalog :refer [catalog]]
    [broker.operations :refer [last-service-operation last-binding-operation]]
    [broker.services :refer [get-instance create-instance delete-instance]]
    [broker.binding :refer [get-binding bind-instance delete-binding]]
    [clojure.string :as st]
    [macchiato.util.response :as r]
    [macchiato.middleware.restful-format :as rf]))


(def stringify (. js/JSON -stringify))

(defn not-found [_ res _]
  (-> (js/JSON.stringify #js {:error "NOT_FOUND", :code "404"})
      (r/not-found)
      (r/content-type "text/html")
      (res)))



(defn crud [method h] 
  {method 
    (rf/wrap-restful-format 
      (fn [req res _] 
        (-> 
          (stringify (clj->js (h req)))
          (r/ok)
          (r/content-type "application/json")
          (res)
          )))})


(defn not-impl [req] #{:code 500 :message "This method is not implemented yet"})

(def routes
  [ "/v2/" { 
      "catalog" (crud :get catalog)

      "service_instances" { 
        ["/" :get_instance_id]  (crud :get get-instance)
        ["/" :put_instance_id] (crud :put create-instance)
        ["/" :delete_instance_id] (crud :put delete-instance)
        
        ["/" :instance_id "/last_operation"] (crud :get last-service-operation)
        ["/" :instance_id "/service_bindings/" :binding_id "/last_operation"] (crud :get last-binding-operation)

        ["/" :instance_id "/service_bindings/" :put_binding_id] (crud :put bind-instance)
        ["/" :instance_id "/service_bindings/" :get_binding_id] (crud :get get-binding)
        ["/" :instance_id "/service_bindings/" :delete_binding_id] (crud :delete delete-binding)
        }
    }])

(defn router [req res raise]
  (if-let [{:keys [handler route-params]} (bidi/match-route* routes (:uri req) req)]
    (handler (assoc req :route-params route-params) res raise)
    (not-found req res raise)))