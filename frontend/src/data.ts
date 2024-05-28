import {Food} from './app/shared/models/Food';
import { Tag } from './app/shared/models/Tag';

export const sample_foods: Food[] = [
    {
        id: "1",
        name: "Margherita Pizza",
        price: 9.99,
        tags: ["Italian", "Vegetarian"],
        favorite: true,
        stars: 4.5,
        imageUrl: "assets/Food_Images.png",
        origins: ["Italy"],
        cookTime: "20 mins"
      },
      {
        id: "2",
        name: "Sushi Platter",
        price: 15.99,
        tags: ["Japanese", "Seafood"],
        favorite: false,
        stars: 4.7,
        imageUrl: "assets/Food_Images.png",
        origins: ["Japan"],
        cookTime: "30 mins"
      },
      {
        id: "3",
        name: "Chicken Biryani",
        price: 12.99,
        tags: ["Indian", "Spicy"],
        favorite: true,
        stars: 4.8,
        imageUrl: "assets/Food_Images.png",
        origins: ["India"],
        cookTime: "45 mins"
      },
      {
        id: "4",
        name: "Tacos",
        price: 7.99,
        tags: ["Mexican", "Street Food"],
        favorite: false,
        stars: 4.3,
        imageUrl: "assets/Food_Images.png",
        origins: ["Mexico"],
        cookTime: "15 mins"
      },
      {
        id: "5",
        name: "Cheeseburger",
        price: 8.99,
        tags: ["American", "Fast Food"],
        favorite: true,
        stars: 4.6,
        imageUrl: "assets/Food_Images.png",
        origins: ["USA"],
        cookTime: "10 mins"
      },
      {
        id: "6",
        name: "Pad Thai",
        price: 10.99,
        tags: ["Thai", "Noodles"],
        favorite: true,
        stars: 4.7,
        imageUrl: "assets/Food_Images.png",
        origins: ["Thailand"],
        cookTime: "25 mins"
      }
];

export const sample_tags: Tag[] = [
  { name: "Italian", count: 1 },
  { name: "Vegetarian", count: 1 },
  { name: "Japanese", count: 1 },
  { name: "Seafood", count: 1 },
  { name: "Indian", count: 1 },
  { name: "Spicy", count: 1 },
  { name: "Mexican", count: 1 },
  { name: "Street Food", count: 1 },
  { name: "American", count: 1 },
  { name: "Fast Food", count: 1 },
  { name: "Thai", count: 1 },
  { name: "Noodles", count: 1 }
];
