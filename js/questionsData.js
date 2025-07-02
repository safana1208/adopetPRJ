const questions = [
  {
    label: "What type of pet are you looking for?",
    name: "type",
    options: [
      { label: "Dog", value: "dog" },
      { label: "Cat", value: "cat" },
      { label: "No preference", value: "any" }
    ]
  },
  {
    label: "What is your preferred pet age?",
    name: "age",
    options: [
      { label: "Puppy/Kitten", value: "kitten" },
      { label: "Adult", value: "adult" },
      { label: "Senior", value: "senior" }
    ]
  },
  {
    label: "Do you prefer a specific breed or are you open to mix breed pets?",
    name: "breed",
    options: [
      { label: "I prefer a specific breed", value: "specific", withInput: true },
      { label: "I’m open to mixed breed pets", value: "mixed" }
    ]
  },
  {
    label: "What size of pet do you prefer?",
    name: "size",
    options: [
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" }
    ]
  },
  {
    label: "Do you care if the cat/dog sheds fur?",
    name: "fur",
    options: [
      { label: "Yes, I prefer low shedding", value: "low" },
      { label: "No, I don't mind shedding", value: "dont_mind" }
    ]
  }
];
