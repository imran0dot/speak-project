import React, { Component } from 'react';
import { /*Formik, Form,*/ Field, FieldArray } from 'formik';

//text
import TextField from '@mui/material/TextField';

import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';

import {Loader, LoaderOptions} from 'google-maps';
import axios from 'axios';

 import { useFormikContext } from 'formik';

import {useState, useEffect, useRef} from 'react';


class GeoMapInputField extends Component {
    constructor(props, context) {
      super(props, context);

      this.myRef = React.createRef();

      let googleMapsApiKey = "AIzaSyAqIxjdU4u9hSWZHkoTKdhvLQANMX2uvMk";
      let apiKey = googleMapsApiKey;//getGoogleMapKey();

      //london
      //{"lat": 51.50796719337432, "lng": -0.13161787605657782}

      //paris
      //{"lat": 48.88629824790875, "lng": 2.3521100851887855}

      console.log("this.props", this.props.field.value.lat)
      
      this.state = {
        //location: {"lat": 51.50796719337432, "lng": -0.13161787605657782},
        location: {"lat": 48.88629824790875, "lng": 2.3521100851887855},
        apiKey: apiKey,
      }
      
    }

    componentDidMount() {
      let that = this;

      this.getLocation(function(resp){
        if(typeof resp === "object"){
          that.setState({ 
            location: resp 
          });
        }

        if(resp === "denied"){
          //console.log("render map with defaults")
        }

        //if user has a value already
        if(that.props.field.value.lat && that.props.field.value.lng){
           that.setState({ 
            location: {"lat": that.props.field.value.lat, "lng": that.props.field.value.lng} 
          });         
        }

        that.renderMap();
      });
    
    }
  
 /*   
    fetchAddress() {
      let that = this;    
      let url = "https://maps.googleapis.com/maps/api/geocode/json?address="+this.state.address+"&key="+this.state.apiKey;
      axios.get(url)
        .then(function (response) {
          // handle success
          that.setState({
            location: response.data.results[0].geometry.location
          });

          that.renderMap();
          window.google = {}
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  */

    getLocation(callback) {
      navigator.permissions.query({ name: 'geolocation' })
        .then(function(resp){

          if(resp.state !== "denied"){
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                callback({"lat": position.coords.latitude, "lng": position.coords.longitude});
              });
            } else { 
             callback("Geolocation is not supported by this browser.");
            }
          }
          else {
            callback(resp.state);//denied
          }
          
        })
    }

    controlField(latLng, geoCodeResults){
      let administrative_area_level_1 = "";
      let administrative_area_level_3 = "";
      let locality = "";
      let postalTown = "";
      let route = "";

      if(geoCodeResults.administrative_area_level_1) {
        administrative_area_level_1 = geoCodeResults.administrative_area_level_1;
      }        

      if(geoCodeResults.administrative_area_level_3) {
        administrative_area_level_3 = geoCodeResults.administrative_area_level_3;
      }

      if(geoCodeResults.locality) {
         locality = geoCodeResults.locality;
      }

      if(geoCodeResults.postalTown) {
        postalTown = geoCodeResults.postalTown;
      }

      if(geoCodeResults.route) {
        route = geoCodeResults.route;
      }

      this.props.form.setFieldValue(this.props.name, {lat: latLng.lat, lng: latLng.lng, route:route, postalTown: postalTown, locality: locality, administrative_area_level_1: administrative_area_level_1, administrative_area_level_3: administrative_area_level_3, countryCode: geoCodeResults.code});
    }

    renderMap(){

      const getDataFromGeoCoderResult = (geoCoderResponse) => {

        const geoCoderResponseHead = geoCoderResponse[1];
        const geoCoderData = geoCoderResponseHead.address_components;
        const isEmptyData = !geoCoderResponseHead || !geoCoderData;

        if (isEmptyData) return {};
        
        // support uk boroughs
        let administrative_area_level_3 = "";
        for (let i = 0; i < geoCoderResponse.length; i++) {
            geoCoderResponse[i].address_components.reduce((acc, { types, long_name: value }) => {
              const type = types[0];

              switch (type) {
                case 'administrative_area_level_3':
                  administrative_area_level_3 = value;
              }
            }, {});
        }

        if(administrative_area_level_3){
          geoCoderData.push({long_name: administrative_area_level_3, short_name: administrative_area_level_3, types: ["administrative_area_level_3"]})
        }

        return geoCoderData.reduce((acc, { types, long_name: value, short_name: shortName }) => {
          const type = types[0];

          switch (type) {
            case 'route':
              if(value !== "Unnamed Road") {
                return { ...acc, route: value };
              }
            case 'locality':
              if(value !== "Unnamed Road") {
                return { ...acc, locality: value };
              }
            case 'country':
              return { ...acc, country: value, code: shortName };
            case 'political':
              return { ...acc, political: value };
            case 'administrative_area_level_1':
              return { ...acc, administrative_area_level_1: value };   
            case 'administrative_area_level_3':
              return { ...acc, administrative_area_level_3: value };              
            case 'postal_town':
              return { ...acc, postalTown: value };
            case 'postal_code_prefix':
              return { ...acc, postalCodePrefix: value };
            case 'street_number':
              return { ...acc, streetNumber: value };
            default:
              return acc;
          }
        }, {});
      };

      const customAddressFormat = (response) => {

        if(response.administrative_area_level_3 && response.country) {
          return response.administrative_area_level_3 + ", " + response.country;
        }

        if(response.locality && response.country) {
          return response.locality + ", " + response.country;
        }

        if(response.postalTown && response.country) {
          return response.postalTown + ", " + response.country;
        }

        if(response.route && response.country) {
          return response.route + ", " + response.country;
        }

        if(response.administrative_area_level_1 && response.country) {
          return response.administrative_area_level_1 + ", " + response.country;
        }        

        if(response.country) {
          return response.country;
        } 
          
      };


      let $this = this.myRef.current;
      const myLatlng = this.state.location;
      const options: LoaderOptions = {};

      let that = this;

      const loader = new Loader(this.state.apiKey, options);
      loader.load().then(function (google) {
          
        const map = new google.maps.Map($this, {
          zoom: 9,
          center: myLatlng,
          disableDefaultUI: true,
          zoomControl: true,
          //streetViewControl: false,          
        });
        
        const geocoder = new google.maps.Geocoder();

        // Create the initial InfoWindow.
        let infoWindow = new google.maps.InfoWindow({
          content: "Click the map to set location",
          position: myLatlng,
        });

        infoWindow.open(map);
  
        // Configure the click listener.
        map.addListener("click", (mapsMouseEvent) => {

          geocoder.geocode({'latLng': mapsMouseEvent.latLng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                infoWindow.close();

                // Create a new InfoWindow.
                infoWindow = new google.maps.InfoWindow({
                  position: mapsMouseEvent.latLng,
                });

                that.controlField(mapsMouseEvent.latLng.toJSON(), getDataFromGeoCoderResult(results));

                infoWindow.setContent(customAddressFormat(getDataFromGeoCoderResult(results)));
                
                infoWindow.open(map);
              }
            } else {
              console.log("Geocoder failed due to: " + status);
            }
          });

        });
        
      });
    }

    render() {

      return (
          <>
            <div 
              ref={this.myRef}
              className="googlemapsfield"
            ></div>
            <FieldArray
              name={this.props.name}
            >
              {({ insert, remove, push }) => (
                <div className="field">

                      <div className="row-solo" key={0}  >

                        {this.props.item.fields.map((ch, inx) => (
                          <div key={"x"+inx} className={"field-"+ch.type}>
                            <div className="col-x">
                                 <Field
                                  name={`${this.props.name}.${ch.name}`}
                                 >
                                   {({
                                     field, // { name, value, onChange, onBlur }
                                     form,
                                     meta,
                                   }) => (
                                     <>
                                        <TextField
                                          //id={field.name}
                                          fullWidth={false}
                                          type={ch.type}
                                          label={ch.label}
                                          disabled={this.props.item.disabled}
                                          {...field}
                                          onChange={event => {
                                            form.setFieldValue(field.name, event.target.value);
                                            this.props.onHandle(field.name, event.target.value);
                                          }}
                                        />
                                     </>
                                   )}
                                 </Field>
                            </div>
                          </div>
                        ))}
                      </div>

                      <FormHelperText
                          error={(this.props.form.errors[this.props.name] ? true : false)}
                      > 
                        {typeof this.props.form.errors[this.props.name] === "object" &&
                            <>Geolocation is required</>
                        }
                      </FormHelperText>
                      
                </div>
              )}
            </FieldArray>
          </>
      )
    }
}

export default GeoMapInputField
