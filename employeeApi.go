package employeeApi

import (
	"fmt"
	"net/http"
	"time"
	"encoding/json"
	"strings"
	"strconv"

	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
)

type Employee struct {
	Id       int64     `json:"id" datastore:"-"`
	Name     string    `json:"name"`
	Age      int       `json:"age"`
	Position string    `json:"position"`
	Date     time.Time `json:"date"`
}

func init() {

	http.HandleFunc("/api/employee/", func(w http.ResponseWriter, r *http.Request) {

		sid := strings.TrimPrefix(r.URL.Path, "/api/employee/")
		id, err := strconv.ParseInt(sid, 10, 64)
		if err != nil {
			w.WriteHeader(404)
			fmt.Fprintf(w, "%s", err)
			return
		}

		switch r.Method {
		case "GET":
			getId(w, r, id)
		case "PUT":
			put(w, r, id)
		case "DELETE":
			delete(w, r, id)
		default:
			http.Error(w, "Invalid request method.", 405)
		}
	})
	http.HandleFunc("/api/employee", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
		case "GET":
			get(w, r)
		case "POST":
			post(w, r)
		default:
			http.Error(w, "Invalid request method.", 405)
		}
	})
}

func get(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)
	q := datastore.NewQuery("Employee").Order("Name")

	var employees []Employee
	keys, err := q.GetAll(c, &employees)
	if err != nil {
		w.WriteHeader(500)
		fmt.Fprintf(w, "%s", err)
		return
	}

	for i := 0; i < len(employees); i++ {
		employees[i].Id = keys[i].IntID()
	}

	if employees == nil {
		employees = []Employee{}
	}

	json, _ := json.Marshal(employees)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	fmt.Fprintf(w, "%s", json)
}

func getId(w http.ResponseWriter, r *http.Request, id int64) {
	c := appengine.NewContext(r)

	var employee Employee
	key := datastore.NewKey(c, "Employee", "", id, nil)

	err := datastore.Get(c, key, &employee)
	if err != nil {
		w.WriteHeader(404)
		fmt.Fprintf(w, "%s", err)
		return
	}

	employee.Id = key.IntID()

	json, _ := json.Marshal(employee)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	fmt.Fprintf(w, "%s", json)
}

func post(w http.ResponseWriter, r *http.Request) {
	c := appengine.NewContext(r)

	dec := json.NewDecoder(r.Body)

	var employee Employee
	err := dec.Decode(&employee)

	if err != nil {
		w.WriteHeader(500)
		fmt.Fprintf(w, "%s", err)
		return
	}

	key, err := datastore.Put(c, datastore.NewIncompleteKey(c, "Employee", nil), &employee)
	if err != nil {
		w.WriteHeader(500)
		fmt.Fprintf(w, "%s", err)
		return
	}

	employee.Id = key.IntID()

	json, _ := json.Marshal(employee)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(201)

	fmt.Fprintf(w, "%s", json)
}

func put(w http.ResponseWriter, r *http.Request, id int64) {
	c := appengine.NewContext(r)

	var employee Employee
	key := datastore.NewKey(c, "Employee", "", id, nil)

	err := datastore.Get(c, key, &employee)
	if err != nil {
		w.WriteHeader(404)
		fmt.Fprintf(w, "%s", err)
		return
	}

	dec := json.NewDecoder(r.Body)
	err = dec.Decode(&employee)

	if err != nil {
		w.WriteHeader(500)
		fmt.Fprintf(w, "%s", err)
		return
	}

	key, err = datastore.Put(c, key, &employee)
	if err != nil {
		w.WriteHeader(500)
		fmt.Fprintf(w, "%s", err)
		return
	}

	employee.Id = key.IntID()

	json, _ := json.Marshal(employee)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	fmt.Fprintf(w, "%s", json)
}

func delete(w http.ResponseWriter, r *http.Request, id int64) {
	c := appengine.NewContext(r)

	var employee Employee
	key := datastore.NewKey(c, "Employee", "", id, nil)

	err := datastore.Get(c, key, &employee)
	if err != nil {
		w.WriteHeader(404)
		fmt.Fprintf(w, "%s", err)
		return
	}

	err = datastore.Delete(c, key)
	if err != nil {
		w.WriteHeader(500)
		fmt.Fprintf(w, "%s", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(204)
}
