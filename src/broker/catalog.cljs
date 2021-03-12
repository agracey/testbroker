(ns broker.catalog
  (:require 
    [fs :refer [readFileSync]]
    [taoensso.timbre :refer [info]]))

(defn parse [input] 
    (js->clj 
     ((. js/JSON -parse) input)
     :keywordize-keys true))


(defn stringify [input] 
((. js/JSON -stringify) (clj->js input) :nil 2))

(defn printjson [obj]
  (info (stringify obj)))

(def serviceList 
  (parse (readFileSync "./service-list.json" "utf8")))

;; JSON Schema docs http://json-schema.org
(defn build-schema [{options :options}]
  {:create options
   :update options})

(defn build-plans [chart]
  (map 
    (fn [plan]
      {
        :name (plan :name)
        :id (str (plan :name) "-" (chart :name))
        :description (chart :description)
        :schemas {
          :service_instance (build-schema chart)}
        })
    (chart :plans)))


(defn build-cat-offering [chart] 
  { :name (chart :name) 
    :id (chart :id)
    :description (chart :name) 
    :tags []
    :bindable true
    :instances_retrievable true
    :bindings_retrievable  true
    :allow_context_updates false
    :plans (build-plans chart)
    })

(defn catalog []
  (let [{charts :charts} serviceList]
    (printjson charts)
    (map build-cat-offering charts)))