export const neighborhoodsData = {
  provinces: [
    {
      name: 'Buenos Aires',
      cities: [
        {
          name: 'Ciudad Autónoma de Buenos Aires',
          neighborhoods: [
            {
              name: 'Palermo',
              description: 'Se posicionó como el barrio "estrella" de la ciudad por su exponencial crecimiento en las últimas décadas con propuestas inmobiliarias, gastronómicas, de moda, diseño y arte, junto con los espacios verdes más atractivos.',
              about: 'Es el barrio de mayor extensión dentro de la ciudad y se lo divide informalmente en sub-barrios: Palermo Hollywood -un polo de productoras audiovisuales-, Palermo Soho -con una enorme oferta gastronómica- o Palermo Chico -más residencial-. Gran parte de su superficie está ocupada por los bosques de Palermo con el Rosedal y el Planetario.',
              stats: {
                rental: { gross: '4.09%', monthly: '-4.31%', annual: '28.42%' },
                pricePerM2: 'US$ 3,209',
                infrastructure: { bikeLanes: 29, culturalSpaces: 313 }
              }
            },
            {
              name: 'Recoleta',
              description: 'Uno de los barrios más elegantes y prestigiosos de Buenos Aires, conocido por su arquitectura francesa y sus espacios culturales.',
              about: 'Recoleta es sinónimo de lujo y cultura en Buenos Aires. El barrio alberga el famoso cementerio de Recoleta, el Centro Cultural Recoleta y numerosos museos y galerías de arte.',
              stats: {
                rental: { gross: '3.85%', monthly: '-3.2%', annual: '25.6%' },
                pricePerM2: 'US$ 3,500',
                infrastructure: { bikeLanes: 15, culturalSpaces: 245 }
              }
            }
          ]
        },
        {
          name: 'La Plata',
          neighborhoods: [
            {
              name: 'Centro',
              description: 'Corazón histórico y administrativo de La Plata, con su característica disposición en damero y diagonales.',
              about: 'El centro de La Plata es reconocido por su trazado único, sus edificios históricos y su intensa vida cultural y comercial.',
              stats: {
                rental: { gross: '5.2%', monthly: '1.8%', annual: '22.4%' },
                pricePerM2: 'US$ 1,800',
                infrastructure: { bikeLanes: 12, culturalSpaces: 89 }
              }
            }
          ]
        }
      ]
    },
    {
      name: 'Córdoba',
      cities: [
        {
          name: 'Córdoba Capital',
          neighborhoods: [
            {
              name: 'Nueva Córdoba',
              description: 'Barrio universitario y cultural por excelencia, con una vibrante vida nocturna y comercial.',
              about: 'Nueva Córdoba es el barrio más poblado por estudiantes universitarios, con una gran oferta de departamentos y servicios orientados a los jóvenes.',
              stats: {
                rental: { gross: '6.1%', monthly: '2.1%', annual: '26.8%' },
                pricePerM2: 'US$ 1,950',
                infrastructure: { bikeLanes: 18, culturalSpaces: 156 }
              }
            }
          ]
        }
      ]
    }
  ]
}

