const nations = [
    {
        image: "TG",
        name: "Togo",
    },
    {
        image: "MV",
        name: "Maldives",
    },
    {
        image: "JP",
        name: "Japan",
    },
    {
        image: "HU",
        name: "Hungary",
    },
    {
        image: "SG",
        name: "Singapore",
    },
    {
        image: "GN",
        name: "Guinea",
    },
    {
        image: "EH",
        name: "Western Sahara",
    },
    {
        image: "MW",
        name: "Malawi",
    },
    {
        image: "KP",
        name: "North Korea",
    },
    {
        image: "GY",
        name: "Guyana",
    },
    {
        image: "RE",
        name: "Réunion",
    },
    {
        image: "CG",
        name: "Congo - Brazzaville",
    },
    {
        image: "PM",
        name: "St. Pierre & Miquelon",
    },
    {
        image: "BL",
        name: "St. Barthélemy",
    },
    {
        image: "MU",
        name: "Mauritius",
    },
    {
        image: "SI",
        name: "Slovenia",
    },
    {
        image: "NA",
        name: "Namibia",
    },
    {
        image: "TT",
        name: "Trinidad & Tobago",
    },
    {
        image: "BO",
        name: "Bolivia",
    },
    {
        image: "BS",
        name: "Bahamas",
    },
    {
        image: "BG",
        name: "Bulgaria",
    },
    {
        image: "AX",
        name: "Åland Islands",
    },
    {
        image: "FR",
        name: "France",
    },
    {
        image: "SD",
        name: "Sudan",
    },
    {
        image: "MX",
        name: "Mexico",
    },
    {
        image: "NU",
        name: "Niue",
    },
    {
        image: "BD",
        name: "Bangladesh",
    },
    {
        image: "TD",
        name: "Chad",
    },
    {
        image: "LK",
        name: "Sri Lanka",
    },
    {
        image: "VU",
        name: "Vanuatu",
    },
    {
        image: "IT",
        name: "Italy",
    },
    {
        image: "BQ",
        name: "Caribbean Netherlands",
    },
    {
        image: "BF",
        name: "Burkina Faso",
    },
    {
        image: "MA",
        name: "Morocco",
    },
    {
        image: "MH",
        name: "Marshall Islands",
    },
    {
        image: "IM",
        name: "Isle of Man",
    },
    {
        image: "KR",
        name: "South Korea",
    },
    {
        image: "MN",
        name: "Mongolia",
    },
    {
        image: "ST",
        name: "São Tomé & Príncipe",
    },
    {
        image: "UN",
        name: "United Nations",
    },
    {
        image: "CN",
        name: "China",
    },
    {
        image: "IE",
        name: "Ireland",
    },
    {
        image: "VE",
        name: "Venezuela",
    },
    {
        image: "CO",
        name: "Colombia",
    },
    {
        image: "FM",
        name: "Micronesia",
    },
    {
        image: "JM",
        name: "Jamaica",
    },
    {
        image: "BI",
        name: "Burundi",
    },
    {
        image: "BV",
        name: "Bouvet Island",
    },
    {
        image: "IN",
        name: "India",
    },
    {
        image: "BW",
        name: "Botswana",
    },
    {
        image: "AZ",
        name: "Azerbaijan",
    },
    {
        image: "PH",
        name: "Philippines",
    },
    {
        image: "VI",
        name: "U.S. Virgin Islands",
    },
    {
        image: "WF",
        name: "Wallis & Futuna",
    },
    {
        image: "CA",
        name: "Canada",
    },
    {
        image: "IQ",
        name: "Iraq",
    },
    {
        image: "TA",
        name: "Tristan da Cunha",
    },
    {
        image: "AC",
        name: "Ascension Island",
    },
    {
        image: "NZ",
        name: "New Zealand",
    },
    {
        image: "IL",
        name: "Israel",
    },
    {
        image: "AU",
        name: "Australia",
    },
    {
        image: "ZM",
        name: "Zambia",
    },
    {
        image: "EG",
        name: "Egypt",
    },
    {
        image: "EA",
        name: "Ceuta & Melilla",
    },
    {
        image: "AD",
        name: "Andorra",
    },
    {
        image: "KG",
        name: "Kyrgyzstan",
    },
    {
        image: "HR",
        name: "Croatia",
    },
    {
        image: "YE",
        name: "Yemen",
    },
    {
        image: "MT",
        name: "Malta",
    },
    {
        image: "BY",
        name: "Belarus",
    },
    {
        image: "JO",
        name: "Jordan",
    },
    {
        image: "CY",
        name: "Cyprus",
    },
    {
        image: "LC",
        name: "St. Lucia",
    },
    {
        image: "FJ",
        name: "Fiji",
    },
    {
        image: "BA",
        name: "Bosnia & Herzegovina",
    },
    {
        image: "AO",
        name: "Angola",
    },
    {
        image: "ET",
        name: "Ethiopia",
    },
    {
        image: "DZ",
        name: "Algeria",
    },
    {
        image: "GG",
        name: "Guernsey",
    },
    {
        image: "VC",
        name: "St. Vincent & Grenadines",
    },
    {
        image: "KZ",
        name: "Kazakhstan",
    },
    {
        image: "MK",
        name: "North Macedonia",
    },
    {
        image: "GS",
        name: "South Georgia & South Sandwich Islands",
    },
    {
        image: "SCOTLAND",
        name: "Scotland",
    },
    {
        image: "MG",
        name: "Madagascar",
    },
    {
        image: "CL",
        name: "Chile",
    },
    {
        image: "KI",
        name: "Kiribati",
    },
    {
        image: "HN",
        name: "Honduras",
    },
    {
        image: "UG",
        name: "Uganda",
    },
    {
        image: "ID",
        name: "Indonesia",
    },
    {
        image: "AG",
        name: "Antigua & Barbuda",
    },
    {
        image: "JE",
        name: "Jersey",
    },
    {
        image: "ME",
        name: "Montenegro",
    },
    {
        image: "UA",
        name: "Ukraine",
    },
    {
        image: "NE",
        name: "Niger",
    },
    {
        image: "DO",
        name: "Dominican Republic",
    },
    {
        image: "RU",
        name: "Russia",
    },
    {
        image: "MR",
        name: "Mauritania",
    },
    {
        image: "GM",
        name: "Gambia",
    },
    {
        image: "LI",
        name: "Liechtenstein",
    },
    {
        image: "GH",
        name: "Ghana",
    },
    {
        image: "AS",
        name: "American Samoa",
    },
    {
        image: "SR",
        name: "Suriname",
    },
    {
        image: "BR",
        name: "Brazil",
    },
    {
        image: "SX",
        name: "Sint Maarten",
    },
    {
        image: "CF",
        name: "Central African Republic",
    },
    {
        image: "VG",
        name: "British Virgin Islands",
    },
    {
        image: "LT",
        name: "Lithuania",
    },
    {
        image: "SE",
        name: "Sweden",
    },
    {
        image: "PL",
        name: "Poland",
    },
    {
        image: "GU",
        name: "Guam",
    },
    {
        image: "NO",
        name: "Norway",
    },
    {
        image: "BB",
        name: "Barbados",
    },
    {
        image: "GD",
        name: "Grenada",
    },
    {
        image: "SZ",
        name: "Eswatini",
    },
    {
        image: "DE",
        name: "Germany",
    },
    {
        image: "NG",
        name: "Nigeria",
    },
    {
        image: "WALES",
        name: "Wales",
    },
    {
        image: "LV",
        name: "Latvia",
    },
    {
        image: "CM",
        name: "Cameroon",
    },
    {
        image: "XK",
        name: "Kosovo",
    },
    {
        image: "PN",
        name: "Pitcairn Islands",
    },
    {
        image: "GW",
        name: "Guinea-Bissau",
    },
    {
        image: "FI",
        name: "Finland",
    },
    {
        image: "AE",
        name: "United Arab Emirates",
    },
    {
        image: "CX",
        name: "Christmas Island",
    },
    {
        image: "DK",
        name: "Denmark",
    },
    {
        image: "PA",
        name: "Panama",
    },
    {
        image: "EU",
        name: "European Union",
    },
    {
        image: "GI",
        name: "Gibraltar",
    },
    {
        image: "SA",
        name: "Saudi Arabia",
    },
    {
        image: "BT",
        name: "Bhutan",
    },
    {
        image: "CP",
        name: "Clipperton Island",
    },
    {
        image: "PK",
        name: "Pakistan",
    },
    {
        image: "CD",
        name: "Congo - Kinshasa",
    },
    {
        image: "KM",
        name: "Comoros",
    },
    {
        image: "IR",
        name: "Iran",
    },
    {
        image: "SH",
        name: "St. Helena",
    },
    {
        image: "CV",
        name: "Cape Verde",
    },
    {
        image: "FK",
        name: "Falkland Islands",
    },
    {
        image: "TO",
        name: "Tonga",
    },
    {
        image: "PT",
        name: "Portugal",
    },
    {
        image: "UM",
        name: "U.S. Outlying Islands",
    },
    {
        image: "DJ",
        name: "Djibouti",
    },
    {
        image: "PR",
        name: "Puerto Rico",
    },
    {
        image: "TW",
        name: "Taiwan",
    },
    {
        image: "GT",
        name: "Guatemala",
    },
    {
        image: "KN",
        name: "St. Kitts & Nevis",
    },
    {
        image: "IC",
        name: "Canary Islands",
    },
    {
        image: "MO",
        name: "Macao SAR China",
    },
    {
        image: "IO",
        name: "British Indian Ocean Territory",
    },
    {
        image: "VA",
        name: "Vatican City",
    },
    {
        image: "MM",
        name: "Myanmar (Burma)",
    },
    {
        image: "PG",
        name: "Papua New Guinea",
    },
    {
        image: "KH",
        name: "Cambodia",
    },
    {
        image: "SV",
        name: "El Salvador",
    },
    {
        image: "NR",
        name: "Nauru",
    },
    {
        image: "HM",
        name: "Heard & McDonald Islands",
    },
    {
        image: "KE",
        name: "Kenya",
    },
    {
        image: "GL",
        name: "Greenland",
    },
    {
        image: "AF",
        name: "Afghanistan",
    },
    {
        image: "BZ",
        name: "Belize",
    },
    {
        image: "GQ",
        name: "Equatorial Guinea",
    },
    {
        image: "MF",
        name: "St. Martin",
    },
    {
        image: "CR",
        name: "Costa Rica",
    },
    {
        image: "GR",
        name: "Greece",
    },
    {
        image: "CI",
        name: "Côte d’Ivoire",
    },
    {
        image: "US",
        name: "United States",
    },
    {
        image: "RS",
        name: "Serbia",
    },
    {
        image: "CC",
        name: "Cocos (Keeling) Islands",
    },
    {
        image: "ES",
        name: "Spain",
    },
    {
        image: "QA",
        name: "Qatar",
    },
    {
        image: "PE",
        name: "Peru",
    },
    {
        image: "BM",
        name: "Bermuda",
    },
    {
        image: "BE",
        name: "Belgium",
    },
    {
        image: "MZ",
        name: "Mozambique",
    },
    {
        image: "MQ",
        name: "Martinique",
    },
    {
        image: "MC",
        name: "Monaco",
    },
    {
        image: "EC",
        name: "Ecuador",
    },
    {
        image: "ER",
        name: "Eritrea",
    },
    {
        image: "DM",
        name: "Dominica",
    },
    {
        image: "MP",
        name: "Northern Mariana Islands",
    },
    {
        image: "CW",
        name: "Curaçao",
    },
    {
        image: "KY",
        name: "Cayman Islands",
    },
    {
        image: "SO",
        name: "Somalia",
    },
    {
        image: "CZ",
        name: "Czechia",
    },
    {
        image: "TN",
        name: "Tunisia",
    },
    {
        image: "OM",
        name: "Oman",
    },
    {
        image: "ZA",
        name: "South Africa",
    },
    {
        image: "BN",
        name: "Brunei",
    },
    {
        image: "GF",
        name: "French Guiana",
    },
    {
        image: "PF",
        name: "French Polynesia",
    },
    {
        image: "SL",
        name: "Sierra Leone",
    },
    {
        image: "SB",
        name: "Solomon Islands",
    },
    {
        image: "TZ",
        name: "Tanzania",
    },
    {
        image: "MD",
        name: "Moldova",
    },
    {
        image: "AQ",
        name: "Antarctica",
    },
    {
        image: "LY",
        name: "Libya",
    },
    {
        image: "NC",
        name: "New Caledonia",
    },
    {
        image: "UY",
        name: "Uruguay",
    },
    {
        image: "TV",
        name: "Tuvalu",
    },
    {
        image: "TJ",
        name: "Tajikistan",
    },
    {
        image: "LA",
        name: "Laos",
    },
    {
        image: "AR",
        name: "Argentina",
    },
    {
        image: "GE",
        name: "Georgia",
    },
    {
        image: "GA",
        name: "Gabon",
    },
    {
        image: "AI",
        name: "Anguilla",
    },
    {
        image: "SY",
        name: "Syria",
    },
    {
        image: "LU",
        name: "Luxembourg",
    },
    {
        image: "DG",
        name: "Diego Garcia",
    },
    {
        image: "PW",
        name: "Palau",
    },
    {
        image: "ML",
        name: "Mali",
    },
    {
        image: "IS",
        name: "Iceland",
    },
    {
        image: "PY",
        name: "Paraguay",
    },
    {
        image: "SK",
        name: "Slovakia",
    },
    {
        image: "LR",
        name: "Liberia",
    },
    {
        image: "NP",
        name: "Nepal",
    },
    {
        image: "SN",
        name: "Senegal",
    },
    {
        image: "LS",
        name: "Lesotho",
    },
    {
        image: "PS",
        name: "Palestinian Territories",
    },
    {
        image: "AT",
        name: "Austria",
    },
    {
        image: "LB",
        name: "Lebanon",
    },
    {
        image: "UZ",
        name: "Uzbekistan",
    },
    {
        image: "TH",
        name: "Thailand",
    },
    {
        image: "HK",
        name: "Hong Kong SAR China",
    },
    {
        image: "VN",
        name: "Vietnam",
    },
    {
        image: "AL",
        name: "Albania",
    },
    {
        image: "TC",
        name: "Turks & Caicos Islands",
    },
    {
        image: "NL",
        name: "Netherlands",
    },
    {
        image: "YT",
        name: "Mayotte",
    },
    {
        image: "ZW",
        name: "Zimbabwe",
    },
    {
        image: "WS",
        name: "Samoa",
    },
    {
        image: "HT",
        name: "Haiti",
    },
    {
        image: "GB",
        name: "United Kingdom",
    },
    {
        image: "RO",
        name: "Romania",
    },
    {
        image: "TK",
        name: "Tokelau",
    },
    {
        image: "BJ",
        name: "Benin",
    },
    {
        image: "CH",
        name: "Switzerland",
    },
    {
        image: "GP",
        name: "Guadeloupe",
    },
    {
        image: "EE",
        name: "Estonia",
    },
    {
        image: "TM",
        name: "Turkmenistan",
    },
    {
        image: "SS",
        name: "South Sudan",
    },
    {
        image: "TL",
        name: "Timor-Leste",
    },
    {
        image: "CK",
        name: "Cook Islands",
    },
    {
        image: "BH",
        name: "Bahrain",
    },
    {
        image: "SM",
        name: "San Marino",
    },
    {
        image: "MY",
        name: "Malaysia",
    },
    {
        image: "MS",
        name: "Montserrat",
    },
    {
        image: "AW",
        name: "Aruba",
    },
    {
        image: "ENGLAND",
        name: "England",
    },
    {
        image: "KW",
        name: "Kuwait",
    },
    {
        image: "NF",
        name: "Norfolk Island",
    },
    {
        image: "TF",
        name: "French Southern Territories",
    },
    {
        image: "SC",
        name: "Seychelles",
    },
    {
        image: "SJ",
        name: "Svalbard & Jan Mayen",
    },
    {
        image: "TR",
        name: "Turkey",
    },
    {
        image: "FO",
        name: "Faroe Islands",
    },
    {
        image: "AM",
        name: "Armenia",
    },
    {
        image: "CU",
        name: "Cuba",
    },
    {
        image: "RW",
        name: "Rwanda",
    },
    {
        image: "NI",
        name: "Nicaragua",
    }
]