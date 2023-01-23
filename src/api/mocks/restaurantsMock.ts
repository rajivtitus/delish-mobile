export const restaurantsMock = {
  html_attributions: [],
  next_page_token: "some token",
  results: [
    {
      business_status: "OPERATIONAL",
      geometry: {
        location: {
          lat: 41.886065,
          lng: -87.6208832,
        },
        viewport: {
          northeast: {
            lat: 41.88758823029149,
            lng: -87.6194830697085,
          },
          southwest: {
            lat: 41.88489026970849,
            lng: -87.6221810302915,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      name: "Fairmont Chicago - Millennium Park",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 1194,
          html_attributions: [""],
          photo_reference: "",
          width: 1800,
        },
      ],
      place_id: "some place id 21",
      plus_code: {
        compound_code: "",
        global_code: "",
      },
      price_level: 3,
      rating: 4.4,
      reference: "",
      scope: "",
      types: [
        "lodging",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 2085,
      vicinity: "200 North Columbus Drive, Chicago",
    },
  ],
  status: "OK",
};
