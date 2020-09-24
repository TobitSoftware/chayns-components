const countries = [
    {
        code: 'AF',
        name: 'Afghanistan',
    },
    {
        code: 'EG',
        name: 'Ägypten',
    },
    {
        code: 'AL',
        name: 'Albanien',
    },
    {
        code: 'DZ',
        name: 'Algerien',
    },
    {
        code: 'AD',
        name: 'Andorra',
    },
    {
        code: 'AO',
        name: 'Angola',
    },
    {
        code: 'AI',
        name: 'Anguilla',
    },
    {
        code: 'AQ',
        name: 'Antarktis',
    },
    {
        code: 'AG',
        name: 'Antigua und Barbuda',
    },
    {
        code: 'GQ',
        name: 'Äquatorial Guinea',
    },
    {
        code: 'AR',
        name: 'Argentinien',
    },
    {
        code: 'AM',
        name: 'Armenien',
    },
    {
        code: 'AW',
        name: 'Aruba',
    },
    {
        code: 'AZ',
        name: 'Aserbaidschan',
    },
    {
        code: 'ET',
        name: 'Äthiopien',
    },
    {
        code: 'AU',
        name: 'Australien',
    },
    {
        code: 'BS',
        name: 'Bahamas',
    },
    {
        code: 'BH',
        name: 'Bahrain',
    },
    {
        code: 'BD',
        name: 'Bangladesh',
    },
    {
        code: 'BB',
        name: 'Barbados',
    },
    {
        code: 'BE',
        name: 'Belgien',
    },
    {
        code: 'BZ',
        name: 'Belize',
    },
    {
        code: 'BJ',
        name: 'Benin',
    },
    {
        code: 'BM',
        name: 'Bermudas',
    },
    {
        code: 'BT',
        name: 'Bhutan',
    },
    {
        code: 'MM',
        name: 'Birma',
    },
    {
        code: 'BO',
        name: 'Bolivien',
    },
    {
        code: 'BA',
        name: 'Bosnien-Herzegowina',
    },
    {
        code: 'BW',
        name: 'Botswana',
    },
    {
        code: 'BV',
        name: 'Bouvet Inseln',
    },
    {
        code: 'BR',
        name: 'Brasilien',
    },
    {
        code: 'IO',
        name: 'Britisch-Indischer Ozean',
    },
    {
        code: 'BN',
        name: 'Brunei',
    },
    {
        code: 'BG',
        name: 'Bulgarien',
    },
    {
        code: 'BF',
        name: 'Burkina Faso',
    },
    {
        code: 'BI',
        name: 'Burundi',
    },
    {
        code: 'CL',
        name: 'Chile',
    },
    {
        code: 'CN',
        name: 'China',
    },
    {
        code: 'CX',
        name: 'Christmas Island',
    },
    {
        code: 'CK',
        name: 'Cook Inseln',
    },
    {
        code: 'CR',
        name: 'Costa Rica',
    },
    {
        code: 'DK',
        name: 'Dänemark',
    },
    {
        code: 'DE',
        name: 'Deutschland',
    },
    {
        code: 'DJ',
        name: 'Djibuti',
    },
    {
        code: 'DM',
        name: 'Dominika',
    },
    {
        code: 'DO',
        name: 'Dominikanische Republik',
    },
    {
        code: 'EC',
        name: 'Ecuador',
    },
    {
        code: 'SV',
        name: 'El Salvador',
    },
    {
        code: 'CI',
        name: 'Elfenbeinküste',
    },
    {
        code: 'ER',
        name: 'Eritrea',
    },
    {
        code: 'EE',
        name: 'Estland',
    },
    {
        code: 'FK',
        name: 'Falkland Inseln',
    },
    {
        code: 'FO',
        name: 'Färöer Inseln',
    },
    {
        code: 'FJ',
        name: 'Fidschi',
    },
    {
        code: 'FI',
        name: 'Finnland',
    },
    {
        code: 'FR',
        name: 'Frankreich',
    },
    {
        code: 'GF',
        name: 'Französisch Guyana',
    },
    {
        code: 'PF',
        name: 'Französisch Polynesien',
    },
    {
        code: 'TF',
        name: 'Französisches Süd-Territorium',
    },
    {
        code: 'GA',
        name: 'Gabun',
    },
    {
        code: 'GM',
        name: 'Gambia',
    },
    {
        code: 'GE',
        name: 'Georgien',
    },
    {
        code: 'GH',
        name: 'Ghana',
    },
    {
        code: 'GI',
        name: 'Gibraltar',
    },
    {
        code: 'GD',
        name: 'Grenada',
    },
    {
        code: 'GR',
        name: 'Griechenland',
    },
    {
        code: 'GL',
        name: 'Grönland',
    },
    {
        code: 'UK',
        name: 'Großbritannien',
    },
    {
        code: 'GP',
        name: 'Guadeloupe',
    },
    {
        code: 'GU',
        name: 'Guam',
    },
    {
        code: 'GT',
        name: 'Guatemala',
    },
    {
        code: 'GN',
        name: 'Guinea',
    },
    {
        code: 'GW',
        name: 'Guinea Bissau',
    },
    {
        code: 'GY',
        name: 'Guyana',
    },
    {
        code: 'HT',
        name: 'Haiti',
    },
    {
        code: 'HM',
        name: 'Heard und McDonald Islands',
    },
    {
        code: 'HN',
        name: 'Honduras',
    },
    {
        code: 'HK',
        name: 'Hong Kong',
    },
    {
        code: 'IN',
        name: 'Indien',
    },
    {
        code: 'ID',
        name: 'Indonesien',
    },
    {
        code: 'IQ',
        name: 'Irak',
    },
    {
        code: 'IR',
        name: 'Iran',
    },
    {
        code: 'IE',
        name: 'Irland',
    },
    {
        code: 'IS',
        name: 'Island',
    },
    {
        code: 'IL',
        name: 'Israel',
    },
    {
        code: 'IT',
        name: 'Italien',
    },
    {
        code: 'JM',
        name: 'Jamaika',
    },
    {
        code: 'JP',
        name: 'Japan',
    },
    {
        code: 'YE',
        name: 'Jemen',
    },
    {
        code: 'JO',
        name: 'Jordanien',
    },
    {
        code: 'YU',
        name: 'Jugoslawien',
    },
    {
        code: 'KY',
        name: 'Kaiman Inseln',
    },
    {
        code: 'KH',
        name: 'Kambodscha',
    },
    {
        code: 'CM',
        name: 'Kamerun',
    },
    {
        code: 'CA',
        name: 'Kanada',
    },
    {
        code: 'CV',
        name: 'Kap Verde',
    },
    {
        code: 'KZ',
        name: 'Kasachstan',
    },
    {
        code: 'KE',
        name: 'Kenia',
    },
    {
        code: 'KG',
        name: 'Kirgisistan',
    },
    {
        code: 'KI',
        name: 'Kiribati',
    },
    {
        code: 'CC',
        name: 'Kokosinseln',
    },
    {
        code: 'CO',
        name: 'Kolumbien',
    },
    {
        code: 'KM',
        name: 'Komoren',
    },
    {
        code: 'CG',
        name: 'Kongo',
    },
    {
        code: 'CD',
        name: 'Kongo, Demokratische Republik',
    },
    {
        code: 'HR',
        name: 'Kroatien',
    },
    {
        code: 'CU',
        name: 'Kuba',
    },
    {
        code: 'KW',
        name: 'Kuwait',
    },
    {
        code: 'LA',
        name: 'Laos',
    },
    {
        code: 'LS',
        name: 'Lesotho',
    },
    {
        code: 'LV',
        name: 'Lettland',
    },
    {
        code: 'LB',
        name: 'Libanon',
    },
    {
        code: 'LR',
        name: 'Liberia',
    },
    {
        code: 'LY',
        name: 'Libyen',
    },
    {
        code: 'LI',
        name: 'Liechtenstein',
    },
    {
        code: 'LT',
        name: 'Litauen',
    },
    {
        code: 'LU',
        name: 'Luxemburg',
    },
    {
        code: 'MO',
        name: 'Macao',
    },
    {
        code: 'MG',
        name: 'Madagaskar',
    },
    {
        code: 'MW',
        name: 'Malawi',
    },
    {
        code: 'MY',
        name: 'Malaysia',
    },
    {
        code: 'MV',
        name: 'Malediven',
    },
    {
        code: 'ML',
        name: 'Mali',
    },
    {
        code: 'MT',
        name: 'Malta',
    },
    {
        code: 'MP',
        name: 'Marianen',
    },
    {
        code: 'MA',
        name: 'Marokko',
    },
    {
        code: 'MH',
        name: 'Marshall Inseln',
    },
    {
        code: 'MQ',
        name: 'Martinique',
    },
    {
        code: 'MR',
        name: 'Mauretanien',
    },
    {
        code: 'MU',
        name: 'Mauritius',
    },
    {
        code: 'YT',
        name: 'Mayotte',
    },
    {
        code: 'MK',
        name: 'Mazedonien',
    },
    {
        code: 'MX',
        name: 'Mexiko',
    },
    {
        code: 'FM',
        name: 'Mikronesien',
    },
    {
        code: 'MZ',
        name: 'Mocambique',
    },
    {
        code: 'MD',
        name: 'Moldavien',
    },
    {
        code: 'MC',
        name: 'Monaco',
    },
    {
        code: 'MN',
        name: 'Mongolei',
    },
    {
        code: 'MS',
        name: 'Montserrat',
    },
    {
        code: 'NA',
        name: 'Namibia',
    },
    {
        code: 'NR',
        name: 'Nauru',
    },
    {
        code: 'NP',
        name: 'Nepal',
    },
    {
        code: 'NC',
        name: 'Neukaledonien',
    },
    {
        code: 'NZ',
        name: 'Neuseeland',
    },
    {
        code: 'NI',
        name: 'Nicaragua',
    },
    {
        code: 'NL',
        name: 'Niederlande',
    },
    {
        code: 'AN',
        name: 'Niederländische Antillen',
    },
    {
        code: 'NE',
        name: 'Niger',
    },
    {
        code: 'NG',
        name: 'Nigeria',
    },
    {
        code: 'NU',
        name: 'Niue',
    },
    {
        code: 'KP',
        name: 'Nord Korea',
    },
    {
        code: 'NF',
        name: 'Norfolk Inseln',
    },
    {
        code: 'NO',
        name: 'Norwegen',
    },
    {
        code: 'OM',
        name: 'Oman',
    },
    {
        code: 'AT',
        name: 'Österreich',
    },
    {
        code: 'PK',
        name: 'Pakistan',
    },
    {
        code: 'PS',
        name: 'Palästina',
    },
    {
        code: 'PW',
        name: 'Palau',
    },
    {
        code: 'PA',
        name: 'Panama',
    },
    {
        code: 'PG',
        name: 'Papua Neuguinea',
    },
    {
        code: 'PY',
        name: 'Paraguay',
    },
    {
        code: 'PE',
        name: 'Peru',
    },
    {
        code: 'PH',
        name: 'Philippinen',
    },
    {
        code: 'PN',
        name: 'Pitcairn',
    },
    {
        code: 'PL',
        name: 'Polen',
    },
    {
        code: 'PT',
        name: 'Portugal',
    },
    {
        code: 'PR',
        name: 'Puerto Rico',
    },
    {
        code: 'QA',
        name: 'Qatar',
    },
    {
        code: 'RE',
        name: 'Reunion',
    },
    {
        code: 'RW',
        name: 'Ruanda',
    },
    {
        code: 'RO',
        name: 'Rumänien',
    },
    {
        code: 'RU',
        name: 'Russland',
    },
    {
        code: 'LC',
        name: 'Saint Lucia',
    },
    {
        code: 'ZM',
        name: 'Sambia',
    },
    {
        code: 'AS',
        name: 'Samoa',
    },
    {
        code: 'WS',
        name: 'Samoa',
    },
    {
        code: 'SM',
        name: 'San Marino',
    },
    {
        code: 'ST',
        name: 'Sao Tome',
    },
    {
        code: 'SA',
        name: 'Saudi Arabien',
    },
    {
        code: 'SE',
        name: 'Schweden',
    },
    {
        code: 'CH',
        name: 'Schweiz',
    },
    {
        code: 'SN',
        name: 'Senegal',
    },
    {
        code: 'SC',
        name: 'Seychellen',
    },
    {
        code: 'SL',
        name: 'Sierra Leone',
    },
    {
        code: 'SG',
        name: 'Singapur',
    },
    {
        code: 'SK',
        name: 'Slowakei',
    },
    {
        code: 'SI',
        name: 'Slowenien',
    },
    {
        code: 'SB',
        name: 'Solomon Inseln',
    },
    {
        code: 'SO',
        name: 'Somalia',
    },
    {
        code: 'GS',
        name: 'South Georgia, South Sandwich Isl.',
    },
    {
        code: 'ES',
        name: 'Spanien',
    },
    {
        code: 'LK',
        name: 'Sri Lanka',
    },
    {
        code: 'SH',
        name: 'St. Helena',
    },
    {
        code: 'KN',
        name: 'St. Kitts Nevis Anguilla',
    },
    {
        code: 'PM',
        name: 'St. Pierre und Miquelon',
    },
    {
        code: 'VC',
        name: 'St. Vincent',
    },
    {
        code: 'KR',
        name: 'Südkorea',
    },
    {
        code: 'ZA',
        name: 'Südafrika',
    },
    {
        code: 'SD',
        name: 'Sudan',
    },
    {
        code: 'SR',
        name: 'Surinam',
    },
    {
        code: 'SJ',
        name: 'Svalbard und Jan Mayen Islands',
    },
    {
        code: 'SZ',
        name: 'Swasiland',
    },
    {
        code: 'SY',
        name: 'Syrien',
    },
    {
        code: 'TJ',
        name: 'Tadschikistan',
    },
    {
        code: 'TW',
        name: 'Taiwan',
    },
    {
        code: 'TZ',
        name: 'Tansania',
    },
    {
        code: 'TH',
        name: 'Thailand',
    },
    {
        code: 'TP',
        name: 'Timor',
    },
    {
        code: 'TG',
        name: 'Togo',
    },
    {
        code: 'TK',
        name: 'Tokelau',
    },
    {
        code: 'TO',
        name: 'Tonga',
    },
    {
        code: 'TT',
        name: 'Trinidad Tobago',
    },
    {
        code: 'TD',
        name: 'Tschad',
    },
    {
        code: 'CZ',
        name: 'Tschechische Republik',
    },
    {
        code: 'TN',
        name: 'Tunesien',
    },
    {
        code: 'TR',
        name: 'Türkei',
    },
    {
        code: 'TM',
        name: 'Turkmenistan',
    },
    {
        code: 'TC',
        name: 'Turks und Kaikos Inseln',
    },
    {
        code: 'TV',
        name: 'Tuvalu',
    },
    {
        code: 'UG',
        name: 'Uganda',
    },
    {
        code: 'UA',
        name: 'Ukraine',
    },
    {
        code: 'HU',
        name: 'Ungarn',
    },
    {
        code: 'UY',
        name: 'Uruguay',
    },
    {
        code: 'UZ',
        name: 'Usbekistan',
    },
    {
        code: 'VU',
        name: 'Vanuatu',
    },
    {
        code: 'VA',
        name: 'Vatikan',
    },
    {
        code: 'VE',
        name: 'Venezuela',
    },
    {
        code: 'AE',
        name: 'Vereinigte Arabische Emirate',
    },
    {
        code: 'US',
        name: 'Vereinigte Staaten von Amerika',
    },
    {
        code: 'VN',
        name: 'Vietnam',
    },
    {
        code: 'VG',
        name: 'Virgin Island (Brit.)',
    },
    {
        code: 'VI',
        name: 'Virgin Island (USA)',
    },
    {
        code: 'WF',
        name: 'Wallis et Futuna',
    },
    {
        code: 'BY',
        name: 'Weissrussland',
    },
    {
        code: 'EH',
        name: 'Westsahara',
    },
    {
        code: 'CF',
        name: 'Zentralafrikanische Republik',
    },
    {
        code: 'ZW',
        name: 'Zimbabwe',
    },
    {
        code: 'CY',
        name: 'Zypern',
    },
];

export default countries;
