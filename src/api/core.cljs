(ns api.core 
  (:require 
    [taoensso.timbre :refer [info]]
    [api.routes :refer [router]]
    [macchiato.middleware.defaults :as defaults]
    [macchiato.server :as http]))

(defn handler
  [request callback]
  (callback {:status 200
             :body "Hello Macchiato 5"}))

(defn server []
  (info "Hey I am running now!")
  (let [host "0.0.0.0" 
        port  3000]
    (http/start
      {:handler router
       :host host
       :port port 
       :on-success #(info "server started on " host ":" port)})))
