import { IPotionOptions } from 'src/models/Potions.models';

const prayerRecipe: IPotionOptions = {
  name: 'Prayer potion',
  base: {
    id: 99,
    name: 'Ranarr potion (unf)',
  },
  ingredient: {
    id: 231,
    name: 'Snape grass',
  },
  finishedPotion: {
    id: 139,
    name: 'Ranarr potion',
  },
};

const staminaRecipe: IPotionOptions = {
  name: 'Stamina potion',
  base: {
    id: 3018,
    name: 'Super energy(3)',
  },
  ingredient: {
    id: 12640,
    name: 'Amylase crystal',
    multiplier: 3,
  },
  finishedPotion: {
    id: 12627,
    name: 'Stamina potion(3)',
  },
};

export default [prayerRecipe, staminaRecipe];
