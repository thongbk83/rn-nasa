import normalizeNasaData from "../normalizeNasaData";

describe("normalizeNasaData", () => {
  test("search", () => {
    const response = {
      collection: {
        version: "1.0",
        items: [
          {
            data: [
              {
                date_created: "2014-08-07T19:51:51Z",
                keywords: ["Pluto", "New Horizons"],
                center: "JPL",
                title: "A Moon over Pluto Animation",
                media_type: "image",
                description: "A Moon over Pluto Animation description",
                nasa_id: "PIA11217",
                description_508: "A Moon over Pluto Animation description",
                secondary_creator:
                  "NASA/Johns Hopkins University Applied Physics Laboratory/Southwest Research Institute"
              }
            ],
            href:
              "https://images-assets.nasa.gov/image/PIA11217/collection.json",
            links: [
              {
                rel: "preview",
                href:
                  "https://images-assets.nasa.gov/image/PIA11217/PIA11217~thumb.jpg",
                render: "image"
              }
            ]
          },
          {
            data: [
              {
                date_created: "1998-03-28T14:44:27Z",
                keywords: ["Pluto", "Hubble Space Telescope"],
                center: "JPL",
                title: "Map of Pluto Surface",
                media_type: "video",
                description: "Map of Pluto Surface description",
                nasa_id: "PIA00826",
                description_508: "Map of Pluto Surface description",
                secondary_creator:
                  "Alan Stern Southwest Research Institute, Marc Buie Lowell Observatory, NASA and ESA"
              }
            ],
            href:
              "https://images-assets.nasa.gov/image/PIA00826/collection.json",
            links: [
              {
                rel: "preview",
                href:
                  "https://images-assets.nasa.gov/image/PIA00826/PIA00826~thumb.jpg",
                render: "image"
              }
            ]
          }
        ],
        metadata: { total_hits: 1 },
        href: "https://images-api.nasa.gov/search?nasa_id=PIA11217"
      }
    };

    const expectedResponse = [
      {
        dateCreated: "2014-08-07T19:51:51Z",
        title: "A Moon over Pluto Animation",
        description: "A Moon over Pluto Animation description",
        nasaId: "PIA11217",
        mediaType: "image",
        linkPreview:
          "https://images-assets.nasa.gov/image/PIA11217/PIA11217~thumb.jpg",
        linkFile:
          "https://images-assets.nasa.gov/image/PIA11217/PIA11217~thumb.jpg"
      },
      {
        dateCreated: "1998-03-28T14:44:27Z",
        title: "Map of Pluto Surface",
        description: "Map of Pluto Surface description",
        nasaId: "PIA00826",
        mediaType: "video",

        linkPreview:
          "https://images-assets.nasa.gov/image/PIA00826/PIA00826~thumb.jpg",
        linkFile:
          "https://images-assets.nasa.gov/image/PIA00826/PIA00826~medium.mp4"
      }
    ];

    expect(normalizeNasaData.search(response)).toEqual(expectedResponse);
  });
});
