export const stations = [
  {
    "id": "dilshad_garden",
    "name": "Dilshad Garden",
    "coordinates": {
      "latitude": 28.675991,
      "longitude": 77.321495
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "jhilmil",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "shaheed_nagar",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "jhilmil",
    "name": "Jhilmil",
    "coordinates": {
      "latitude": 28.675648,
      "longitude": 77.312393
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "dilshad_garden",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mansrover_park",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "mansrover_park",
    "name": "Mansrover park",
    "coordinates": {
      "latitude": 28.675352,
      "longitude": 77.301178
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "jhilmil",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "shahdara",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "shahdara",
    "name": "Shahdara",
    "coordinates": {
      "latitude": 28.673531,
      "longitude": 77.28727
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "mansrover_park",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "welcome",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "welcome",
    "name": "Welcome",
    "coordinates": {
      "latitude": 28.671986,
      "longitude": 77.277931
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      },
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "east_azad_nagar",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "jafrabad",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "shahdara",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "seelam_pur",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "pink",
        "red"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "pink",
          "to_line": "red",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "seelam_pur",
    "name": "Seelam Pur",
    "coordinates": {
      "latitude": 28.670324,
      "longitude": 77.267311
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "welcome",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "shastri_park",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "shastri_park",
    "name": "Shastri Park",
    "coordinates": {
      "latitude": 28.668451,
      "longitude": 77.250404
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "seelam_pur",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "kashmere_gate",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "kashmere_gate",
    "name": "Kashmere Gate",
    "coordinates": {
      "latitude": 28.667879,
      "longitude": 77.228012
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      },
      {
        "name": "violet",
        "dwell_time_seconds": 45
      },
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "lal_quila",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "civil_lines",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "chandni_chowk",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "shastri_park",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "tis_hazari",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "red",
        "violet",
        "yellow"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "red",
          "to_line": "violet",
          "time_seconds": 240
        },
        {
          "from_line": "red",
          "to_line": "yellow",
          "time_seconds": 240
        },
        {
          "from_line": "violet",
          "to_line": "yellow",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "tis_hazari",
    "name": "Tis Hazari",
    "coordinates": {
      "latitude": 28.667137,
      "longitude": 77.216721
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "pul_bangash",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "kashmere_gate",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "pul_bangash",
    "name": "Pul Bangash",
    "coordinates": {
      "latitude": 28.66571,
      "longitude": 77.206329
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "pratap_nagar",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "tis_hazari",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "pratap_nagar",
    "name": "Pratap Nagar",
    "coordinates": {
      "latitude": 28.666632,
      "longitude": 77.196869
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "pul_bangash",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "shastri_nagar",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "shastri_nagar",
    "name": "Shastri Nagar",
    "coordinates": {
      "latitude": 28.670135,
      "longitude": 77.181679
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "pratap_nagar",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "inderlok",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "inderlok",
    "name": "Inderlok",
    "coordinates": {
      "latitude": 28.673452,
      "longitude": 77.170235
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      },
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "shastri_nagar",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "kanhaiya_nagar",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "ashok_park_main",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "green",
        "red"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "green",
          "to_line": "red",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "kanhaiya_nagar",
    "name": "Kanhaiya Nagar",
    "coordinates": {
      "latitude": 28.682386,
      "longitude": 77.162552
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "inderlok",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "keshav_puram",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "keshav_puram",
    "name": "Keshav Puram",
    "coordinates": {
      "latitude": 28.688944,
      "longitude": 77.161774
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "kanhaiya_nagar",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "netaji_subash_place",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "netaji_subash_place",
    "name": "Netaji Subash Place",
    "coordinates": {
      "latitude": 28.695637,
      "longitude": 77.152428
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      },
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "keshav_puram",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "kohat_enclave",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "shalimar_bagh",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "shakurpur",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "pink",
        "red"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "pink",
          "to_line": "red",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "kohat_enclave",
    "name": "Kohat Enclave",
    "coordinates": {
      "latitude": 28.697943,
      "longitude": 77.140465
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "netaji_subash_place",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "pitampura",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "pitampura",
    "name": "Pitampura",
    "coordinates": {
      "latitude": 28.70318,
      "longitude": 77.132355
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "kohat_enclave",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "rohini_east",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "rohini_east",
    "name": "Rohini East",
    "coordinates": {
      "latitude": 28.707941,
      "longitude": 77.125732
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "pitampura",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "rohini_west",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "rohini_west",
    "name": "Rohini West",
    "coordinates": {
      "latitude": 28.715008,
      "longitude": 77.115746
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "rohini_east",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "rithala",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "rithala",
    "name": "Rithala",
    "coordinates": {
      "latitude": 28.720821,
      "longitude": 77.105042
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "rohini_west",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "mundka",
    "name": "Mundka",
    "coordinates": {
      "latitude": 28.682411,
      "longitude": 77.028282
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "mundka_industrial_area_(m.i.a)",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "rajdhani_park",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "rajdhani_park",
    "name": "Rajdhani Park",
    "coordinates": {
      "latitude": 28.682217,
      "longitude": 77.043869
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "mundka",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "nangloi_railway_station",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "nangloi_railway_station",
    "name": "Nangloi Railway Station",
    "coordinates": {
      "latitude": 28.682091,
      "longitude": 77.05619
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "rajdhani_park",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "nangloi",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "nangloi",
    "name": "Nangloi",
    "coordinates": {
      "latitude": 28.682356,
      "longitude": 77.064728
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "nangloi_railway_station",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "maharaja_surajmal_stadium",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "maharaja_surajmal_stadium",
    "name": "Maharaja Surajmal Stadium",
    "coordinates": {
      "latitude": 28.681833,
      "longitude": 77.073891
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "nangloi",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "udyog_nagar",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "udyog_nagar",
    "name": "Udyog Nagar",
    "coordinates": {
      "latitude": 28.681047,
      "longitude": 77.078674
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "maharaja_surajmal_stadium",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "peera_garhi",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "peera_garhi",
    "name": "Peera Garhi",
    "coordinates": {
      "latitude": 28.67972,
      "longitude": 77.092491
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "udyog_nagar",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "paschim_vihar_(west)",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "paschim_vihar_(west)",
    "name": "Paschim Vihar (West)",
    "coordinates": {
      "latitude": 28.678539,
      "longitude": 77.102119
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "peera_garhi",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "paschim_vihar_(east)",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "paschim_vihar_(east)",
    "name": "Paschim Vihar (East)",
    "coordinates": {
      "latitude": 28.677305,
      "longitude": 77.112251
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "paschim_vihar_(west)",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "madipur",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "madipur",
    "name": "Madipur",
    "coordinates": {
      "latitude": 28.676418,
      "longitude": 77.117294
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "paschim_vihar_(east)",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "shivaji_park",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "shivaji_park",
    "name": "Shivaji Park",
    "coordinates": {
      "latitude": 28.674965,
      "longitude": 77.128258
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "madipur",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "punjabi_bagh",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "punjabi_bagh",
    "name": "Punjabi Bagh",
    "coordinates": {
      "latitude": 28.672943,
      "longitude": 77.146011
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "shivaji_park",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "ashok_park_main",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "ashok_park_main",
    "name": "Ashok Park Main",
    "coordinates": {
      "latitude": 28.671572,
      "longitude": 77.155159
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "inderlok",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "punjabi_bagh",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "satguru_ram_singh_marg",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "satguru_ram_singh_marg",
    "name": "Satguru Ram Singh Marg",
    "coordinates": {
      "latitude": 28.662188,
      "longitude": 77.157829
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "kirti_nagar",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "ashok_park_main",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "samaypur_badli",
    "name": "Samaypur Badli",
    "coordinates": {
      "latitude": 28.742872,
      "longitude": 77.146545
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "rohini_sector_18-19",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "rohini_sector_18-19",
    "name": "Rohini Sector 18-19",
    "coordinates": {
      "latitude": 28.740192,
      "longitude": 77.135574
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "samaypur_badli",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "haiderpur_badli_mor",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "haiderpur_badli_mor",
    "name": "Haiderpur Badli Mor",
    "coordinates": {
      "latitude": 28.718657,
      "longitude": 77.149956
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "rohini_sector_18-19",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "jahangirpuri",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "jahangirpuri",
    "name": "Jahangirpuri",
    "coordinates": {
      "latitude": 28.72818,
      "longitude": 77.16124
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "haiderpur_badli_mor",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "adarsh_nagar",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "adarsh_nagar",
    "name": "Adarsh Nagar",
    "coordinates": {
      "latitude": 28.696377,
      "longitude": 77.208809
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "jahangirpuri",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "azadpur",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "azadpur",
    "name": "Azadpur",
    "coordinates": {
      "latitude": 28.707287,
      "longitude": 77.179863
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      },
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "majlis_park",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "shalimar_bagh",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "adarsh_nagar",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "model_town",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "pink",
        "yellow"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "pink",
          "to_line": "yellow",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "model_town",
    "name": "Model Town",
    "coordinates": {
      "latitude": 28.702833,
      "longitude": 77.193764
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "azadpur",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "guru_tegh_bahadur_nagar",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "guru_tegh_bahadur_nagar",
    "name": "Guru Tegh Bahadur Nagar",
    "coordinates": {
      "latitude": 28.698195,
      "longitude": 77.206985
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "model_town",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "vishwavidyalaya",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "vishwavidyalaya",
    "name": "Vishwavidyalaya",
    "coordinates": {
      "latitude": 28.694765,
      "longitude": 77.212418
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "guru_tegh_bahadur_nagar",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "vidhan_sabha",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "vidhan_sabha",
    "name": "Vidhan Sabha",
    "coordinates": {
      "latitude": 28.687845,
      "longitude": 77.221626
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "vishwavidyalaya",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "civil_lines",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "civil_lines",
    "name": "Civil Lines",
    "coordinates": {
      "latitude": 28.676945,
      "longitude": 77.224953
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "vidhan_sabha",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "kashmere_gate",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "chandni_chowk",
    "name": "Chandni Chowk",
    "coordinates": {
      "latitude": 28.656443,
      "longitude": 77.229218
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "chawri_bazar",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "kashmere_gate",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "chawri_bazar",
    "name": "Chawri Bazar",
    "coordinates": {
      "latitude": 28.649635,
      "longitude": 77.22628
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "chandni_chowk",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "new_delhi",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "new_delhi",
    "name": "New Delhi",
    "coordinates": {
      "latitude": 28.642944,
      "longitude": 77.222351
    },
    "lines": [
      {
        "name": "orange/airport",
        "dwell_time_seconds": 45
      },
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "shivaji_stadium",
        "line": "orange/airport",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "chawri_bazar",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "rajiv_chowk",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "orange/airport",
        "yellow"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "orange/airport",
          "to_line": "yellow",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "rajiv_chowk",
    "name": "Rajiv Chowk",
    "coordinates": {
      "latitude": 28.632896,
      "longitude": 77.219574
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      },
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "new_delhi",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "patel_chowk",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "barakhamba",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "rk_ashram_marg",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "blue",
        "yellow"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "blue",
          "to_line": "yellow",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "patel_chowk",
    "name": "Patel Chowk",
    "coordinates": {
      "latitude": 28.622967,
      "longitude": 77.212288
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "rajiv_chowk",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "central_secretariat",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "central_secretariat",
    "name": "Central Secretariat",
    "coordinates": {
      "latitude": 28.614973,
      "longitude": 77.212029
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      },
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "janpath",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "khan_market",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "patel_chowk",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "udyog_bhawan",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "violet",
        "yellow"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "violet",
          "to_line": "yellow",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "udyog_bhawan",
    "name": "Udyog Bhawan",
    "coordinates": {
      "latitude": 28.611525,
      "longitude": 77.210052
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "central_secretariat",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "lok_kalyan_marg",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "lok_kalyan_marg",
    "name": "Lok Kalyan Marg",
    "coordinates": {
      "latitude": 28.597519,
      "longitude": 77.209122
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "udyog_bhawan",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "jorbagh",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "jorbagh",
    "name": "Jorbagh",
    "coordinates": {
      "latitude": 28.587234,
      "longitude": 77.212662
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "lok_kalyan_marg",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dilli_haat_-_ina",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "dilli_haat_-_ina",
    "name": "Dilli Haat - INA",
    "coordinates": {
      "latitude": 28.575195,
      "longitude": 77.209473
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      },
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "sarojini_nagar",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "south_extension",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "jorbagh",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "aiims",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "pink",
        "yellow"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "pink",
          "to_line": "yellow",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "aiims",
    "name": "AIIMS",
    "coordinates": {
      "latitude": 28.568199,
      "longitude": 77.207947
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "dilli_haat_-_ina",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "green_park",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "green_park",
    "name": "Green Park",
    "coordinates": {
      "latitude": 28.559853,
      "longitude": 77.206902
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "aiims",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "hauz_khas",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "hauz_khas",
    "name": "Hauz Khas",
    "coordinates": {
      "latitude": 28.543346,
      "longitude": 77.206673
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      },
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "panchsheel_park",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "iit",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "green_park",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "malviya_nagar",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "magenta",
        "yellow"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "magenta",
          "to_line": "yellow",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "malviya_nagar",
    "name": "Malviya Nagar",
    "coordinates": {
      "latitude": 28.52817,
      "longitude": 77.205612
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "hauz_khas",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "saket",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "saket",
    "name": "Saket",
    "coordinates": {
      "latitude": 28.520638,
      "longitude": 77.199379
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "malviya_nagar",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "qutab_minar",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "qutab_minar",
    "name": "Qutab Minar",
    "coordinates": {
      "latitude": 28.512714,
      "longitude": 77.185791
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "saket",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "chhattarpur",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "chhattarpur",
    "name": "Chhattarpur",
    "coordinates": {
      "latitude": 28.506584,
      "longitude": 77.174866
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "qutab_minar",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "sultanpur",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "sultanpur",
    "name": "Sultanpur",
    "coordinates": {
      "latitude": 28.499214,
      "longitude": 77.161362
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "chhattarpur",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "ghitorni",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "ghitorni",
    "name": "Ghitorni",
    "coordinates": {
      "latitude": 28.49383,
      "longitude": 77.149071
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "sultanpur",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "arjan_garh",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "arjan_garh",
    "name": "Arjan Garh",
    "coordinates": {
      "latitude": 28.48082,
      "longitude": 77.12587
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "ghitorni",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "gurudronacharya",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "gurudronacharya",
    "name": "Gurudronacharya",
    "coordinates": {
      "latitude": 28.482075,
      "longitude": 77.102219
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "arjan_garh",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "sikanderpur",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "sikanderpur",
    "name": "Sikanderpur",
    "coordinates": {
      "latitude": 28.481352,
      "longitude": 77.092995
    },
    "lines": [
      {
        "name": "rapid",
        "dwell_time_seconds": 45
      },
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "sikanderpur_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "phase-i_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "gurudronacharya",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mg_road",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "rapid",
        "yellow"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "rapid",
          "to_line": "yellow",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "mg_road",
    "name": "MG Road",
    "coordinates": {
      "latitude": 28.47967,
      "longitude": 77.080444
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "sikanderpur",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "iffco_chowk",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "iffco_chowk",
    "name": "IFFCO Chowk",
    "coordinates": {
      "latitude": 28.472137,
      "longitude": 77.072502
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "mg_road",
        "line": "yellow",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "huda_city_centre",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "huda_city_centre",
    "name": "Huda City Centre",
    "coordinates": {
      "latitude": 28.459118,
      "longitude": 77.072586
    },
    "lines": [
      {
        "name": "yellow",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "iffco_chowk",
        "line": "yellow",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "yellow"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "vaishali",
    "name": "Vaishali",
    "coordinates": {
      "latitude": 28.650059,
      "longitude": 77.337608
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "kaushambi",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "kaushambi",
    "name": "Kaushambi",
    "coordinates": {
      "latitude": 28.645428,
      "longitude": 77.322273
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "vaishali",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "anand_vihar",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "anand_vihar",
    "name": "Anand Vihar",
    "coordinates": {
      "latitude": 28.647005,
      "longitude": 77.316185
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      },
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "ip_extension",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "kaushambi",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "karkarduma",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "karkarduma",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "blue",
        "pink"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "blue",
          "to_line": "pink",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "karkarduma",
    "name": "Karkarduma",
    "coordinates": {
      "latitude": 28.648653,
      "longitude": 77.304581
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      },
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "karkarduma_court",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "anand_vihar",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "anand_vihar",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "preet_vihar",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "blue",
        "pink"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "blue",
          "to_line": "pink",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "preet_vihar",
    "name": "Preet Vihar",
    "coordinates": {
      "latitude": 28.641352,
      "longitude": 77.295158
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "karkarduma",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "nirman_vihar",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "nirman_vihar",
    "name": "Nirman Vihar",
    "coordinates": {
      "latitude": 28.637049,
      "longitude": 77.287872
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "preet_vihar",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "laxmi_nagar",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "laxmi_nagar",
    "name": "Laxmi Nagar",
    "coordinates": {
      "latitude": 28.629843,
      "longitude": 77.276428
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "nirman_vihar",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "yamuna_bank",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_city_centre",
    "name": "Noida City Centre",
    "coordinates": {
      "latitude": 28.574593,
      "longitude": 77.356117
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sec-34",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "golf_course",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "golf_course",
    "name": "Golf Course",
    "coordinates": {
      "latitude": 28.566917,
      "longitude": 77.345726
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_city_centre",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "botanical_garden",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "botanical_garden",
    "name": "Botanical Garden",
    "coordinates": {
      "latitude": 28.564198,
      "longitude": 77.334656
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      },
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "okhla_bird_sanctuary",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "golf_course",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sec_-18",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "blue",
        "magenta"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "blue",
          "to_line": "magenta",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "noida_sec_-18",
    "name": "Noida Sec -18",
    "coordinates": {
      "latitude": 28.570843,
      "longitude": 77.326088
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "botanical_garden",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sec_-16",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sec_-16",
    "name": "Noida Sec -16",
    "coordinates": {
      "latitude": 28.577921,
      "longitude": 77.318115
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sec_-18",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sec_-15",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sec_-15",
    "name": "Noida Sec -15",
    "coordinates": {
      "latitude": 28.585018,
      "longitude": 77.311584
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sec_-16",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "new_ashok_nagar",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "new_ashok_nagar",
    "name": "New Ashok Nagar",
    "coordinates": {
      "latitude": 28.58847,
      "longitude": 77.30146
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sec_-15",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mayur_vihar_ext",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "mayur_vihar_ext",
    "name": "Mayur Vihar Ext",
    "coordinates": {
      "latitude": 28.594124,
      "longitude": 77.294495
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "new_ashok_nagar",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mayur_vihar-i",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "mayur_vihar-i",
    "name": "Mayur Vihar-I",
    "coordinates": {
      "latitude": 28.604425,
      "longitude": 77.289421
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      },
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "sarai_kale_khan_-_nizamuddin",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mayur_vihar_pocket_1",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mayur_vihar_ext",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "akshardham",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "blue",
        "pink"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "blue",
          "to_line": "pink",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "akshardham",
    "name": "Akshardham",
    "coordinates": {
      "latitude": 28.618364,
      "longitude": 77.279816
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "mayur_vihar-i",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "yamuna_bank",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "yamuna_bank",
    "name": "Yamuna Bank",
    "coordinates": {
      "latitude": 28.623178,
      "longitude": 77.267937
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "laxmi_nagar",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "akshardham",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "indraprastha",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "indraprastha",
    "name": "Indraprastha",
    "coordinates": {
      "latitude": 28.620272,
      "longitude": 77.250076
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "yamuna_bank",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "supreme_court",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "supreme_court",
    "name": "Supreme Court",
    "coordinates": {
      "latitude": 28.623438,
      "longitude": 77.2425
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "indraprastha",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mandi_house",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "mandi_house",
    "name": "Mandi House",
    "coordinates": {
      "latitude": 28.625816,
      "longitude": 77.234726
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      },
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "ito",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "janpath",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "supreme_court",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "barakhamba",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "blue",
        "violet"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "blue",
          "to_line": "violet",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "barakhamba",
    "name": "Barakhamba",
    "coordinates": {
      "latitude": 28.629662,
      "longitude": 77.224876
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "rajiv_chowk",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mandi_house",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "rk_ashram_marg",
    "name": "RK Ashram Marg",
    "coordinates": {
      "latitude": 28.639217,
      "longitude": 77.206291
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "rajiv_chowk",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "jhandewalan",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "jhandewalan",
    "name": "Jhandewalan",
    "coordinates": {
      "latitude": 28.644312,
      "longitude": 77.199791
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "rk_ashram_marg",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "karol_bagh",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "karol_bagh",
    "name": "Karol Bagh",
    "coordinates": {
      "latitude": 28.643925,
      "longitude": 77.188416
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "jhandewalan",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "rajendra_place",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "rajendra_place",
    "name": "Rajendra Place",
    "coordinates": {
      "latitude": 28.64241,
      "longitude": 77.191833
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "karol_bagh",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "patel_nagar",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "patel_nagar",
    "name": "Patel Nagar",
    "coordinates": {
      "latitude": 28.645037,
      "longitude": 77.167046
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "rajendra_place",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "shadipur",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "shadipur",
    "name": "Shadipur",
    "coordinates": {
      "latitude": 28.65143,
      "longitude": 77.156021
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "kirti_nagar",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "patel_nagar",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "kirti_nagar",
    "name": "Kirti Nagar",
    "coordinates": {
      "latitude": 28.655773,
      "longitude": 77.148499
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      },
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "moti_nagar",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "satguru_ram_singh_marg",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "shadipur",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "blue",
        "green"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "blue",
          "to_line": "green",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "moti_nagar",
    "name": "Moti Nagar",
    "coordinates": {
      "latitude": 28.657803,
      "longitude": 77.140488
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "kirti_nagar",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "ramesh_nagar",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "ramesh_nagar",
    "name": "Ramesh Nagar",
    "coordinates": {
      "latitude": 28.652809,
      "longitude": 77.131462
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "moti_nagar",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "rajouri_garden",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "rajouri_garden",
    "name": "Rajouri Garden",
    "coordinates": {
      "latitude": 28.649157,
      "longitude": 77.122749
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      },
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "ramesh_nagar",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "tagore_garden",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "esi_basai_darapur",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mayapuri",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "blue",
        "pink"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "blue",
          "to_line": "pink",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "tagore_garden",
    "name": "Tagore Garden",
    "coordinates": {
      "latitude": 28.643795,
      "longitude": 77.112747
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "rajouri_garden",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "subash_nagar",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "subash_nagar",
    "name": "Subash Nagar",
    "coordinates": {
      "latitude": 28.640381,
      "longitude": 77.10273
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "tagore_garden",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "tilak_nagar",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "tilak_nagar",
    "name": "Tilak Nagar",
    "coordinates": {
      "latitude": 28.636568,
      "longitude": 77.096336
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "subash_nagar",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "janak_puri_east",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "janak_puri_east",
    "name": "Janak Puri East",
    "coordinates": {
      "latitude": 28.633121,
      "longitude": 77.086578
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "tilak_nagar",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "janak_puri_west",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "janak_puri_west",
    "name": "Janak Puri West",
    "coordinates": {
      "latitude": 28.629637,
      "longitude": 77.077866
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      },
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "janak_puri_east",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "uttam_nagar_east",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dabri_mor_-_janakpuri_south",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "blue",
        "magenta"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "blue",
          "to_line": "magenta",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "uttam_nagar_east",
    "name": "Uttam Nagar East",
    "coordinates": {
      "latitude": 28.624643,
      "longitude": 77.063126
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "janak_puri_west",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "uttam_nagar_west",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "uttam_nagar_west",
    "name": "Uttam Nagar West",
    "coordinates": {
      "latitude": 28.621672,
      "longitude": 77.055664
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "uttam_nagar_east",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "nawada",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "nawada",
    "name": "Nawada",
    "coordinates": {
      "latitude": 28.620222,
      "longitude": 77.044991
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "uttam_nagar_west",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dwarka_mor",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "dwarka_mor",
    "name": "Dwarka Mor",
    "coordinates": {
      "latitude": 28.619366,
      "longitude": 77.033188
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "nawada",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dwarka",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "dwarka",
    "name": "Dwarka",
    "coordinates": {
      "latitude": 28.614899,
      "longitude": 77.022629
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      },
      {
        "name": "gray",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "dwarka_mor",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dwarka_sector_-_14",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "nangli",
        "line": "gray",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "blue",
        "gray"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "blue",
          "to_line": "gray",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "dwarka_sector_-_14",
    "name": "Dwarka Sector - 14",
    "coordinates": {
      "latitude": 28.602232,
      "longitude": 77.02594
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "dwarka",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dwarka_sector_-_13",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "dwarka_sector_-_13",
    "name": "Dwarka Sector - 13",
    "coordinates": {
      "latitude": 28.59705,
      "longitude": 77.033043
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "dwarka_sector_-_14",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dwarka_sector_-_12",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "dwarka_sector_-_12",
    "name": "Dwarka Sector - 12",
    "coordinates": {
      "latitude": 28.592234,
      "longitude": 77.040558
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "dwarka_sector_-_13",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dwarka_sector_-_11",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "dwarka_sector_-_11",
    "name": "Dwarka Sector - 11",
    "coordinates": {
      "latitude": 28.58642,
      "longitude": 77.049255
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "dwarka_sector_-_12",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dwarka_sector_-_10",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "dwarka_sector_-_10",
    "name": "Dwarka Sector - 10",
    "coordinates": {
      "latitude": 28.581108,
      "longitude": 77.05719
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "dwarka_sector_-_11",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dwarka_sector_-_9",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "dwarka_sector_-_9",
    "name": "Dwarka Sector - 9",
    "coordinates": {
      "latitude": 28.574284,
      "longitude": 77.065086
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "dwarka_sector_-_10",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dwarka_sector_-_8",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "dwarka_sector_-_8",
    "name": "Dwarka Sector - 8",
    "coordinates": {
      "latitude": 28.565706,
      "longitude": 77.064896
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "dwarka_sector_-_9",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dwarka_sector_-_21",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "dwarka_sector_-_21",
    "name": "Dwarka Sector - 21",
    "coordinates": {
      "latitude": 28.552322,
      "longitude": 77.056198
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      },
      {
        "name": "orange/airport",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "dwarka_sector_-_8",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "igi_airport",
        "line": "orange/airport",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "blue",
        "orange/airport"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "blue",
          "to_line": "orange/airport",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "ito",
    "name": "ITO",
    "coordinates": {
      "latitude": 28.627205,
      "longitude": 77.240952
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "delhi_gate",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mandi_house",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "janpath",
    "name": "Janpath",
    "coordinates": {
      "latitude": 28.627817,
      "longitude": 77.218956
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "central_secretariat",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mandi_house",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "khan_market",
    "name": "Khan Market",
    "coordinates": {
      "latitude": 28.602682,
      "longitude": 77.228096
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "jawahar_lal_nehru_stadium",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "central_secretariat",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "jawahar_lal_nehru_stadium",
    "name": "Jawahar Lal Nehru Stadium",
    "coordinates": {
      "latitude": 28.590475,
      "longitude": 77.23307
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "khan_market",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "jangpura",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "jangpura",
    "name": "Jangpura",
    "coordinates": {
      "latitude": 28.583231,
      "longitude": 77.239662
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "jawahar_lal_nehru_stadium",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "lajpat_nagar",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "lajpat_nagar",
    "name": "Lajpat Nagar",
    "coordinates": {
      "latitude": 28.570705,
      "longitude": 77.233124
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      },
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "jangpura",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "moolchand",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "south_extension",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "vinobapuri",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "pink",
        "violet"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "pink",
          "to_line": "violet",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "moolchand",
    "name": "Moolchand",
    "coordinates": {
      "latitude": 28.564629,
      "longitude": 77.234222
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "lajpat_nagar",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "kailash_colony",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "kailash_colony",
    "name": "Kailash Colony",
    "coordinates": {
      "latitude": 28.554617,
      "longitude": 77.239738
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "moolchand",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "nehru_place",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "nehru_place",
    "name": "Nehru Place",
    "coordinates": {
      "latitude": 28.551134,
      "longitude": 77.251511
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "kailash_colony",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "kalkaji_mandir",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "kalkaji_mandir",
    "name": "Kalkaji Mandir",
    "coordinates": {
      "latitude": 28.549532,
      "longitude": 77.258789
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      },
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "nehru_place",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "govind_puri",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "okhla_nsic",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "nehru_enclave",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": true,
      "interchange_lines": [
        "magenta",
        "violet"
      ],
      "walking_time_between_lines": [
        {
          "from_line": "magenta",
          "to_line": "violet",
          "time_seconds": 240
        }
      ]
    }
  },
  {
    "id": "govind_puri",
    "name": "Govind Puri",
    "coordinates": {
      "latitude": 28.544413,
      "longitude": 77.264259
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "kalkaji_mandir",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "harkesh_nagar_okhla",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "harkesh_nagar_okhla",
    "name": "Harkesh Nagar Okhla",
    "coordinates": {
      "latitude": 28.543194,
      "longitude": 77.275955
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "govind_puri",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "jasola-apollo",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "jasola-apollo",
    "name": "Jasola-Apollo",
    "coordinates": {
      "latitude": 28.538084,
      "longitude": 77.285538
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "harkesh_nagar_okhla",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "sarita_vihar",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "sarita_vihar",
    "name": "Sarita Vihar",
    "coordinates": {
      "latitude": 28.528622,
      "longitude": 77.288345
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "jasola-apollo",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mohan_estate",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "mohan_estate",
    "name": "Mohan Estate",
    "coordinates": {
      "latitude": 28.51959,
      "longitude": 77.294518
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "sarita_vihar",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "tughlakabad_station",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "tughlakabad_station",
    "name": "Tughlakabad Station",
    "coordinates": {
      "latitude": 28.502232,
      "longitude": 77.29866
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "mohan_estate",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "badarpur_border",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "badarpur_border",
    "name": "Badarpur Border",
    "coordinates": {
      "latitude": 28.4932,
      "longitude": 77.30085
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "tughlakabad_station",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "sarai",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "sarai",
    "name": "Sarai",
    "coordinates": {
      "latitude": 28.47794,
      "longitude": 77.304932
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "badarpur_border",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "nhpc_chowk",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "nhpc_chowk",
    "name": "NHPC Chowk",
    "coordinates": {
      "latitude": 28.462435,
      "longitude": 77.305252
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "sarai",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mewala_maharajpur",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "mewala_maharajpur",
    "name": "Mewala Maharajpur",
    "coordinates": {
      "latitude": 28.4485,
      "longitude": 77.308098
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "nhpc_chowk",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "sector-28",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "sector-28",
    "name": "Sector-28",
    "coordinates": {
      "latitude": 28.440586,
      "longitude": 77.305992
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "mewala_maharajpur",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "badkal_mor",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "badkal_mor",
    "name": "Badkal Mor",
    "coordinates": {
      "latitude": 28.422707,
      "longitude": 77.310234
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "sector-28",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "old_faridabad",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "old_faridabad",
    "name": "Old Faridabad",
    "coordinates": {
      "latitude": 28.412172,
      "longitude": 77.311272
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "badkal_mor",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "neelam_chowk_ajronda",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "neelam_chowk_ajronda",
    "name": "Neelam Chowk Ajronda",
    "coordinates": {
      "latitude": 28.400707,
      "longitude": 77.309105
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "old_faridabad",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "bata_chowk",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "bata_chowk",
    "name": "Bata Chowk",
    "coordinates": {
      "latitude": 28.386362,
      "longitude": 77.298782
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "neelam_chowk_ajronda",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "escorts_mujesar",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "escorts_mujesar",
    "name": "Escorts Mujesar",
    "coordinates": {
      "latitude": 28.370199,
      "longitude": 77.315002
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "bata_chowk",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "sant_surdas_(sihi)",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "sikanderpur_(rapid_metro)",
    "name": "Sikanderpur (Rapid Metro)",
    "coordinates": {
      "latitude": 28.480833,
      "longitude": 77.094246
    },
    "lines": [
      {
        "name": "rapid",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "phase_2_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "sikanderpur",
        "line": "rapid",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "rapid"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "phase_2_(rapid_metro)",
    "name": "Phase 2 (Rapid Metro)",
    "coordinates": {
      "latitude": 28.488371,
      "longitude": 77.092865
    },
    "lines": [
      {
        "name": "rapid",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "sikanderpur_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "belvedere_towers_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "rapid"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "belvedere_towers_(rapid_metro)",
    "name": "Belvedere Towers (Rapid Metro)",
    "coordinates": {
      "latitude": 28.492065,
      "longitude": 77.088142
    },
    "lines": [
      {
        "name": "rapid",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "phase_2_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "cyber_city_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "rapid"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "cyber_city_(rapid_metro)",
    "name": "Cyber City (Rapid Metro)",
    "coordinates": {
      "latitude": 28.498478,
      "longitude": 77.089088
    },
    "lines": [
      {
        "name": "rapid",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "belvedere_towers_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "moulsari_avenue_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "rapid"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "moulsari_avenue_(rapid_metro)",
    "name": "Moulsari Avenue (Rapid Metro)",
    "coordinates": {
      "latitude": 28.501572,
      "longitude": 77.094536
    },
    "lines": [
      {
        "name": "rapid",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "cyber_city_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "phase_3_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "rapid"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "phase_3_(rapid_metro)",
    "name": "Phase 3 (Rapid Metro)",
    "coordinates": {
      "latitude": 28.494329,
      "longitude": 77.093552
    },
    "lines": [
      {
        "name": "rapid",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "moulsari_avenue_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "rapid"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "igi_airport",
    "name": "IGI Airport",
    "coordinates": {
      "latitude": 28.554869,
      "longitude": 77.087921
    },
    "lines": [
      {
        "name": "orange/airport",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "dwarka_sector_-_21",
        "line": "orange/airport",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "delhi_aerocity",
        "line": "orange/airport",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "orange/airport"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "delhi_aerocity",
    "name": "Delhi Aerocity",
    "coordinates": {
      "latitude": 28.548792,
      "longitude": 77.120743
    },
    "lines": [
      {
        "name": "orange/airport",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "igi_airport",
        "line": "orange/airport",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dhaula_kuan",
        "line": "orange/airport",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "orange/airport"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "dhaula_kuan",
    "name": "Dhaula Kuan",
    "coordinates": {
      "latitude": 28.591776,
      "longitude": 77.161545
    },
    "lines": [
      {
        "name": "orange/airport",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "delhi_aerocity",
        "line": "orange/airport",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "shivaji_stadium",
        "line": "orange/airport",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "orange/airport"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "shivaji_stadium",
    "name": "Shivaji Stadium",
    "coordinates": {
      "latitude": 28.629007,
      "longitude": 77.209213
    },
    "lines": [
      {
        "name": "orange/airport",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "dhaula_kuan",
        "line": "orange/airport",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "new_delhi",
        "line": "orange/airport",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "orange/airport"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "delhi_gate",
    "name": "Delhi Gate",
    "coordinates": {
      "latitude": 28.640488,
      "longitude": 77.240303
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "ito",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "jama_masjid",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "jama_masjid",
    "name": "Jama Masjid",
    "coordinates": {
      "latitude": 28.650393,
      "longitude": 77.237556
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "delhi_gate",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "lal_quila",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "lal_quila",
    "name": "Lal Quila",
    "coordinates": {
      "latitude": 28.657576,
      "longitude": 77.236595
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "jama_masjid",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "kashmere_gate",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "okhla_bird_sanctuary",
    "name": "Okhla Bird Sanctuary",
    "coordinates": {
      "latitude": 28.552816,
      "longitude": 77.321564
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "kalindi_kunj",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "botanical_garden",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "kalindi_kunj",
    "name": "Kalindi Kunj",
    "coordinates": {
      "latitude": 28.542835,
      "longitude": 77.310173
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "okhla_bird_sanctuary",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "jasola_vihar_shaheen_bagh",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "jasola_vihar_shaheen_bagh",
    "name": "Jasola Vihar Shaheen Bagh",
    "coordinates": {
      "latitude": 28.546005,
      "longitude": 77.296715
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "kalindi_kunj",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "okhla_vihar",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "okhla_vihar",
    "name": "Okhla Vihar",
    "coordinates": {
      "latitude": 28.561255,
      "longitude": 77.291916
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "jasola_vihar_shaheen_bagh",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "jamia_millia_islamia",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "jamia_millia_islamia",
    "name": "Jamia Millia Islamia",
    "coordinates": {
      "latitude": 28.562944,
      "longitude": 77.286209
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "okhla_vihar",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "sukhdev_vihar",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "sukhdev_vihar",
    "name": "Sukhdev Vihar",
    "coordinates": {
      "latitude": 28.559887,
      "longitude": 77.275116
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "jamia_millia_islamia",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "okhla_nsic",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "okhla_nsic",
    "name": "Okhla NSIC",
    "coordinates": {
      "latitude": 28.554575,
      "longitude": 77.26487
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "kalkaji_mandir",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "sukhdev_vihar",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "phase-i_(rapid_metro)",
    "name": "Phase-I (Rapid Metro)",
    "coordinates": {
      "latitude": 28.471981,
      "longitude": 77.094009
    },
    "lines": [
      {
        "name": "rapid",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "sector_42-43_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "sikanderpur",
        "line": "rapid",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "rapid"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "sector_42-43_(rapid_metro)",
    "name": "Sector 42-43 (Rapid Metro)",
    "coordinates": {
      "latitude": 28.458475,
      "longitude": 77.09684
    },
    "lines": [
      {
        "name": "rapid",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "phase-i_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "sector_53-54_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "rapid"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "sector_53-54_(rapid_metro)",
    "name": "Sector 53-54 (Rapid Metro)",
    "coordinates": {
      "latitude": 28.447533,
      "longitude": 77.100487
    },
    "lines": [
      {
        "name": "rapid",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "sector_42-43_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "sector_54_chowk_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "rapid"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "sector_54_chowk_(rapid_metro)",
    "name": "Sector 54 Chowk (Rapid Metro)",
    "coordinates": {
      "latitude": 28.434212,
      "longitude": 77.104782
    },
    "lines": [
      {
        "name": "rapid",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "sector_53-54_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "sector_55-56_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "rapid"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "sector_55-56_(rapid_metro)",
    "name": "Sector 55-56 (Rapid Metro)",
    "coordinates": {
      "latitude": 28.424587,
      "longitude": 77.105042
    },
    "lines": [
      {
        "name": "rapid",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "sector_54_chowk_(rapid_metro)",
        "line": "rapid",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "rapid"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "majlis_park",
    "name": "Majlis Park",
    "coordinates": {
      "latitude": 28.724157,
      "longitude": 77.182068
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "azadpur",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "shalimar_bagh",
    "name": "Shalimar Bagh",
    "coordinates": {
      "latitude": 28.70182,
      "longitude": 77.165184
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "netaji_subash_place",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "azadpur",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "shakurpur",
    "name": "Shakurpur",
    "coordinates": {
      "latitude": 28.685781,
      "longitude": 77.149651
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "netaji_subash_place",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "punjabi_bagh_west",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "punjabi_bagh_west",
    "name": "Punjabi Bagh West",
    "coordinates": {
      "latitude": 28.672747,
      "longitude": 77.139183
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "shakurpur",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "esi_basai_darapur",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "esi_basai_darapur",
    "name": "ESI Basai Darapur",
    "coordinates": {
      "latitude": 28.658159,
      "longitude": 77.127319
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "rajouri_garden",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "punjabi_bagh_west",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "mayapuri",
    "name": "Mayapuri",
    "coordinates": {
      "latitude": 28.637098,
      "longitude": 77.129738
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "rajouri_garden",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "naraina_vihar",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "naraina_vihar",
    "name": "Naraina Vihar",
    "coordinates": {
      "latitude": 28.624121,
      "longitude": 77.136482
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "mayapuri",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "delhi_cantt.",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "delhi_cantt.",
    "name": "Delhi Cantt.",
    "coordinates": {
      "latitude": 28.608641,
      "longitude": 77.140373
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "naraina_vihar",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "durgabai_deshmukh_south_campus",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "durgabai_deshmukh_south_campus",
    "name": "Durgabai Deshmukh South Campus",
    "coordinates": {
      "latitude": 28.589376,
      "longitude": 77.169518
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "delhi_cantt.",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "sir_vishweshwaraiah_moti_bagh",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "nehru_enclave",
    "name": "Nehru Enclave",
    "coordinates": {
      "latitude": 28.545856,
      "longitude": 77.25116
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "kalkaji_mandir",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "greater_kailash",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "greater_kailash",
    "name": "Greater Kailash",
    "coordinates": {
      "latitude": 28.541836,
      "longitude": 77.238243
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "nehru_enclave",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "chirag_delhi",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "chirag_delhi",
    "name": "Chirag Delhi",
    "coordinates": {
      "latitude": 28.541229,
      "longitude": 77.229385
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "greater_kailash",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "panchsheel_park",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "panchsheel_park",
    "name": "Panchsheel Park",
    "coordinates": {
      "latitude": 28.542339,
      "longitude": 77.220512
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "chirag_delhi",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "hauz_khas",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "iit",
    "name": "IIT",
    "coordinates": {
      "latitude": 28.547194,
      "longitude": 77.193832
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "rk_puram",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "hauz_khas",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "rk_puram",
    "name": "RK Puram",
    "coordinates": {
      "latitude": 28.550486,
      "longitude": 77.184952
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "iit",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "munirka",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "munirka",
    "name": "Munirka",
    "coordinates": {
      "latitude": 28.557821,
      "longitude": 77.174026
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "rk_puram",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "vasant_vihar",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "vasant_vihar",
    "name": "Vasant Vihar",
    "coordinates": {
      "latitude": 28.558378,
      "longitude": 77.160774
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "munirka",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "shankar_vihar",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "shankar_vihar",
    "name": "Shankar Vihar",
    "coordinates": {
      "latitude": 28.560787,
      "longitude": 77.140442
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "vasant_vihar",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "terminal_1-_igi_airport",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "terminal_1-_igi_airport",
    "name": "Terminal 1- IGI Airport",
    "coordinates": {
      "latitude": 28.565275,
      "longitude": 77.122391
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "shankar_vihar",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "sadar_bazar_contonment",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "sadar_bazar_contonment",
    "name": "Sadar Bazar Contonment",
    "coordinates": {
      "latitude": 28.577108,
      "longitude": 77.111305
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "terminal_1-_igi_airport",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "palam",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "palam",
    "name": "Palam",
    "coordinates": {
      "latitude": 28.589067,
      "longitude": 77.082954
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "sadar_bazar_contonment",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dashrath_puri",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "dashrath_puri",
    "name": "Dashrath Puri",
    "coordinates": {
      "latitude": 28.602333,
      "longitude": 77.08255
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "palam",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dabri_mor_-_janakpuri_south",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "dabri_mor_-_janakpuri_south",
    "name": "Dabri Mor - Janakpuri South",
    "coordinates": {
      "latitude": 28.615904,
      "longitude": 77.085258
    },
    "lines": [
      {
        "name": "magenta",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "janak_puri_west",
        "line": "magenta",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dashrath_puri",
        "line": "magenta",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "magenta"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "mundka_industrial_area_(m.i.a)",
    "name": "Mundka Industrial Area (M.I.A)",
    "coordinates": {
      "latitude": 28.68396,
      "longitude": 76.989822
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "ghevra_metro_station",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mundka",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "ghevra_metro_station",
    "name": "Ghevra Metro station",
    "coordinates": {
      "latitude": 28.685289,
      "longitude": 76.993584
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "mundka_industrial_area_(m.i.a)",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "tikri_kalan",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "tikri_kalan",
    "name": "Tikri Kalan",
    "coordinates": {
      "latitude": 28.686899,
      "longitude": 76.977249
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "ghevra_metro_station",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "tikri_border",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "tikri_border",
    "name": "Tikri Border",
    "coordinates": {
      "latitude": 28.687876,
      "longitude": 76.963783
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "tikri_kalan",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "pandit_shree_ram_sharma",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "pandit_shree_ram_sharma",
    "name": "Pandit Shree Ram Sharma",
    "coordinates": {
      "latitude": 28.689213,
      "longitude": 76.951088
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "tikri_border",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "bahadurgarh_city",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "bahadurgarh_city",
    "name": "Bahadurgarh City",
    "coordinates": {
      "latitude": 28.690784,
      "longitude": 76.935265
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "pandit_shree_ram_sharma",
        "line": "green",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "brigadier_hoshiyar_singh",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "brigadier_hoshiyar_singh",
    "name": "Brigadier Hoshiyar Singh",
    "coordinates": {
      "latitude": 28.697428,
      "longitude": 76.919128
    },
    "lines": [
      {
        "name": "green",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "bahadurgarh_city",
        "line": "green",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "green"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "sir_vishweshwaraiah_moti_bagh",
    "name": "Sir Vishweshwaraiah Moti Bagh",
    "coordinates": {
      "latitude": 28.578529,
      "longitude": 77.175713
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "durgabai_deshmukh_south_campus",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "bhikaji_cama_place",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "bhikaji_cama_place",
    "name": "Bhikaji Cama Place",
    "coordinates": {
      "latitude": 28.570208,
      "longitude": 77.187866
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "sir_vishweshwaraiah_moti_bagh",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "sarojini_nagar",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "sarojini_nagar",
    "name": "Sarojini Nagar",
    "coordinates": {
      "latitude": 28.570208,
      "longitude": 77.187866
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "bhikaji_cama_place",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dilli_haat_-_ina",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "south_extension",
    "name": "South Extension",
    "coordinates": {
      "latitude": 28.5686,
      "longitude": 77.219818
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "lajpat_nagar",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dilli_haat_-_ina",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "trilokpuri_sanjay_lake",
    "name": "Trilokpuri Sanjay Lake",
    "coordinates": {
      "latitude": 28.613506,
      "longitude": 77.308678
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "east_vinod_nagar_-_mayur_vihar-ii",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mayur_vihar_pocket_1",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "east_vinod_nagar_-_mayur_vihar-ii",
    "name": "East Vinod Nagar - Mayur Vihar-II",
    "coordinates": {
      "latitude": 28.620052,
      "longitude": 77.305588
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "trilokpuri_sanjay_lake",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mandawali_-_west_vinod_nagar",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "mandawali_-_west_vinod_nagar",
    "name": "Mandawali - West Vinod Nagar",
    "coordinates": {
      "latitude": 28.624861,
      "longitude": 77.304146
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "east_vinod_nagar_-_mayur_vihar-ii",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "ip_extension",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "ip_extension",
    "name": "IP Extension",
    "coordinates": {
      "latitude": 28.631599,
      "longitude": 77.310898
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "mandawali_-_west_vinod_nagar",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "anand_vihar",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "karkarduma_court",
    "name": "Karkarduma Court",
    "coordinates": {
      "latitude": 28.649473,
      "longitude": 77.295341
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "krishna_nagar",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "karkarduma",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "krishna_nagar",
    "name": "Krishna Nagar",
    "coordinates": {
      "latitude": 28.65782,
      "longitude": 77.290306
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "karkarduma_court",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "east_azad_nagar",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "east_azad_nagar",
    "name": "East Azad Nagar",
    "coordinates": {
      "latitude": 28.665043,
      "longitude": 77.284599
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "krishna_nagar",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "welcome",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "jafrabad",
    "name": "Jafrabad",
    "coordinates": {
      "latitude": 28.682943,
      "longitude": 77.27507
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "maujpur_-_babarpur",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "welcome",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "maujpur_-_babarpur",
    "name": "Maujpur - Babarpur",
    "coordinates": {
      "latitude": 28.692057,
      "longitude": 77.280922
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "jafrabad",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "gokulpuri",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "gokulpuri",
    "name": "Gokulpuri",
    "coordinates": {
      "latitude": 28.703009,
      "longitude": 77.286301
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "maujpur_-_babarpur",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "johri_enclave",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "johri_enclave",
    "name": "Johri Enclave",
    "coordinates": {
      "latitude": 28.713297,
      "longitude": 77.290154
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "gokulpuri",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "shiv_vihar",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "shiv_vihar",
    "name": "Shiv Vihar",
    "coordinates": {
      "latitude": 28.721863,
      "longitude": 77.289635
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "johri_enclave",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "sant_surdas_(sihi)",
    "name": "Sant Surdas (Sihi)",
    "coordinates": {
      "latitude": 28.354666,
      "longitude": 77.316261
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "escorts_mujesar",
        "line": "violet",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "raja_nahar_singh",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "raja_nahar_singh",
    "name": "Raja Nahar Singh",
    "coordinates": {
      "latitude": 28.339899,
      "longitude": 77.331657
    },
    "lines": [
      {
        "name": "violet",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "sant_surdas_(sihi)",
        "line": "violet",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "violet"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "vinobapuri",
    "name": "Vinobapuri",
    "coordinates": {
      "latitude": 28.566179,
      "longitude": 77.249367
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "lajpat_nagar",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "ashram",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "ashram",
    "name": "Ashram",
    "coordinates": {
      "latitude": 28.576065,
      "longitude": 77.25753
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "vinobapuri",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "sarai_kale_khan_-_nizamuddin",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "sarai_kale_khan_-_nizamuddin",
    "name": "Sarai Kale Khan - Nizamuddin",
    "coordinates": {
      "latitude": 28.5889,
      "longitude": 77.253189
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "ashram",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mayur_vihar-i",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "mayur_vihar_pocket_1",
    "name": "Mayur Vihar Pocket 1",
    "coordinates": {
      "latitude": 28.606598,
      "longitude": 77.296326
    },
    "lines": [
      {
        "name": "pink",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "trilokpuri_sanjay_lake",
        "line": "pink",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mayur_vihar-i",
        "line": "pink",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "pink"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "shaheed_sthal_(new_bus_adda)",
    "name": "Shaheed Sthal (New Bus Adda)",
    "coordinates": {
      "latitude": 28.670177,
      "longitude": 77.416031
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "hindon_river",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "hindon_river",
    "name": "Hindon River",
    "coordinates": {
      "latitude": 28.673508,
      "longitude": 77.40654
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "shaheed_sthal_(new_bus_adda)",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "arthala",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "arthala",
    "name": "Arthala",
    "coordinates": {
      "latitude": 28.6772,
      "longitude": 77.391876
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "hindon_river",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "mohan_nagar",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "mohan_nagar",
    "name": "Mohan Nagar",
    "coordinates": {
      "latitude": 28.67856,
      "longitude": 77.384209
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "arthala",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "shyam_park",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "shyam_park",
    "name": "Shyam Park",
    "coordinates": {
      "latitude": 28.678217,
      "longitude": 77.370911
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "mohan_nagar",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "major_mohit_sharma_rajender_nagar",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "major_mohit_sharma_rajender_nagar",
    "name": "Major Mohit Sharma Rajender Nagar",
    "coordinates": {
      "latitude": 28.678095,
      "longitude": 77.359528
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "shyam_park",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "raj_bagh",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "raj_bagh",
    "name": "Raj Bagh",
    "coordinates": {
      "latitude": 28.677122,
      "longitude": 77.346466
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "major_mohit_sharma_rajender_nagar",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "shaheed_nagar",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "shaheed_nagar",
    "name": "Shaheed Nagar",
    "coordinates": {
      "latitude": 28.676615,
      "longitude": 77.333809
    },
    "lines": [
      {
        "name": "red",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "dilshad_garden",
        "line": "red",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "raj_bagh",
        "line": "red",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "red"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sec-34",
    "name": "Noida Sec-34",
    "coordinates": {
      "latitude": 28.580229,
      "longitude": 77.363518
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sec-52",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_city_centre",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sec-52",
    "name": "Noida Sec-52",
    "coordinates": {
      "latitude": 28.586849,
      "longitude": 77.372749
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sec-34",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sec-61",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sec-61",
    "name": "Noida Sec-61",
    "coordinates": {
      "latitude": 28.597677,
      "longitude": 77.372368
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sec-52",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sec-59",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sec-59",
    "name": "Noida Sec-59",
    "coordinates": {
      "latitude": 28.609089,
      "longitude": 77.372955
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sec-61",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sec-62",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sec-62",
    "name": "Noida Sec-62",
    "coordinates": {
      "latitude": 28.616991,
      "longitude": 77.373611
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sec-59",
        "line": "blue",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_electronic_city",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_electronic_city",
    "name": "Noida Electronic City",
    "coordinates": {
      "latitude": 28.628685,
      "longitude": 77.375229
    },
    "lines": [
      {
        "name": "blue",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sec-62",
        "line": "blue",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "blue"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "nangli",
    "name": "Nangli",
    "coordinates": {
      "latitude": 28.61722,
      "longitude": 77.010345
    },
    "lines": [
      {
        "name": "gray",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "dwarka",
        "line": "gray",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "najafgarh",
        "line": "gray",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "gray"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "najafgarh",
    "name": "Najafgarh",
    "coordinates": {
      "latitude": 28.613316,
      "longitude": 76.986259
    },
    "lines": [
      {
        "name": "gray",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "nangli",
        "line": "gray",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "dhansa_bus_stand",
        "line": "gray",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "gray"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "dhansa_bus_stand",
    "name": "Dhansa Bus Stand",
    "coordinates": {
      "latitude": 28.611858,
      "longitude": 76.975426
    },
    "lines": [
      {
        "name": "gray",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "najafgarh",
        "line": "gray",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "gray"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sector_51",
    "name": "Noida Sector 51",
    "coordinates": {
      "latitude": 28.585548,
      "longitude": 77.375374
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sector_50",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sector_50",
    "name": "Noida Sector 50",
    "coordinates": {
      "latitude": 28.574547,
      "longitude": 77.378357
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sector_51",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sector_76",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sector_76",
    "name": "Noida Sector 76",
    "coordinates": {
      "latitude": 28.565445,
      "longitude": 77.37973
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sector_50",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sector_101",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sector_101",
    "name": "Noida Sector 101",
    "coordinates": {
      "latitude": 28.556065,
      "longitude": 77.385056
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sector_76",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sector_81",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sector_81",
    "name": "Noida Sector 81",
    "coordinates": {
      "latitude": 28.549259,
      "longitude": 77.390099
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sector_101",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "nsez",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "nsez",
    "name": "NSEZ",
    "coordinates": {
      "latitude": 28.532248,
      "longitude": 77.394951
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sector_81",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sector_83",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sector_83",
    "name": "Noida Sector 83",
    "coordinates": {
      "latitude": 28.522284,
      "longitude": 77.396477
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "nsez",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sector_137",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sector_137",
    "name": "Noida Sector 137",
    "coordinates": {
      "latitude": 28.510817,
      "longitude": 77.403625
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sector_83",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sector_142",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sector_142",
    "name": "Noida Sector 142",
    "coordinates": {
      "latitude": 28.498999,
      "longitude": 77.412567
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sector_137",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sector_143",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sector_143",
    "name": "Noida Sector 143",
    "coordinates": {
      "latitude": 28.494246,
      "longitude": 77.422318
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sector_142",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sector_144",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sector_144",
    "name": "Noida Sector 144",
    "coordinates": {
      "latitude": 28.486376,
      "longitude": 77.432968
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sector_143",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sector_145",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sector_145",
    "name": "Noida Sector 145",
    "coordinates": {
      "latitude": 28.47913,
      "longitude": 77.442307
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sector_144",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sector_146",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sector_146",
    "name": "Noida Sector 146",
    "coordinates": {
      "latitude": 28.468822,
      "longitude": 77.455101
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sector_145",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sector_147",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sector_147",
    "name": "Noida Sector 147",
    "coordinates": {
      "latitude": 28.4594,
      "longitude": 77.465965
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sector_146",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "noida_sector_148",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "noida_sector_148",
    "name": "Noida Sector 148",
    "coordinates": {
      "latitude": 28.448021,
      "longitude": 77.476692
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sector_147",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "knowledge_park",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "knowledge_park",
    "name": "Knowledge Park",
    "coordinates": {
      "latitude": 28.456865,
      "longitude": 77.500298
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "noida_sector_148",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "pari_chowk",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "pari_chowk",
    "name": "Pari Chowk",
    "coordinates": {
      "latitude": 28.463331,
      "longitude": 77.508308
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "knowledge_park",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "alpha_1",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "alpha_1",
    "name": "Alpha 1",
    "coordinates": {
      "latitude": 28.470879,
      "longitude": 77.512718
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "pari_chowk",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "delta_1",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "delta_1",
    "name": "Delta 1",
    "coordinates": {
      "latitude": 28.478374,
      "longitude": 77.525581
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "alpha_1",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "gnida_office",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "gnida_office",
    "name": "GNIDA Office",
    "coordinates": {
      "latitude": 28.484531,
      "longitude": 77.536621
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "delta_1",
        "line": "aqua",
        "travel_time_seconds": 120
      },
      {
        "to_station_id": "depot_station",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  },
  {
    "id": "depot_station",
    "name": "Depot Station",
    "coordinates": {
      "latitude": 28.488651,
      "longitude": 77.544075
    },
    "lines": [
      {
        "name": "aqua",
        "dwell_time_seconds": 45
      }
    ],
    "connections": [
      {
        "to_station_id": "gnida_office",
        "line": "aqua",
        "travel_time_seconds": 120
      }
    ],
    "interchange_info": {
      "is_interchange": false,
      "interchange_lines": [
        "aqua"
      ],
      "walking_time_between_lines": []
    }
  }
]