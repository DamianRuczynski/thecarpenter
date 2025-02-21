export type TProject = {
  id: string;
  title: string;
  description: string;
  category: Category;
  photos: string[];
};

export enum Room {
  KITCHEN = 'kitchen',
  BATHROOM = 'bathroom',
  BEDROOM = 'bedroom',
  LIVING_ROOM = 'living_room',
  DINING_ROOM = 'dining_room',
  OFFICE = 'office',
  HALLWAY = 'hallway',
  LAUNDRY_ROOM = 'laundry_room',
}

export enum Category {
  TABLE = 'table',
  CHAIR = 'chair',
  SOFA = 'sofa',
  BED = 'bed',
  CABINET = 'cabinet',
  SHELF = 'shelf',
  FRIDGE = 'fridge',
  SINK = 'sink',
  BATHTUB = 'bathtub',
  SHOWER = 'shower',
  WASHING_MACHINE = 'washing_machine',
  STOVE = 'stove',
  DESK = 'desk',
  WARDROBE = 'wardrobe',
  NIGHTSTAND = 'nightstand',
  DRESSER = 'dresser',
  COFFEE_TABLE = 'coffee_table',
  TV_STAND = 'tv_stand',
  BOOKCASE = 'bookcase',
  HANGER = 'hanger',
}

export const RoomCategories: Record<Room, Category[]> = {
  [Room.KITCHEN]: [
    Category.TABLE,
    Category.CHAIR,
    Category.CABINET,
    Category.FRIDGE,
    Category.SINK,
    Category.STOVE,
  ],
  [Room.BATHROOM]: [
    Category.SINK,
    Category.BATHTUB,
    Category.SHOWER,
    Category.WASHING_MACHINE,
    Category.CABINET,
  ],
  [Room.BEDROOM]: [
    Category.BED,
    Category.WARDROBE,
    Category.DRESSER,
    Category.NIGHTSTAND,
    Category.SHELF,
  ],
  [Room.LIVING_ROOM]: [
    Category.SOFA,
    Category.COFFEE_TABLE,
    Category.TV_STAND,
    Category.BOOKCASE,
    Category.SHELF,
  ],
  [Room.DINING_ROOM]: [Category.TABLE, Category.CHAIR, Category.CABINET],
  [Room.OFFICE]: [
    Category.DESK,
    Category.CHAIR,
    Category.BOOKCASE,
    Category.SHELF,
  ],
  [Room.HALLWAY]: [Category.HANGER, Category.CABINET, Category.SHELF],
  [Room.LAUNDRY_ROOM]: [
    Category.WASHING_MACHINE,
    Category.CABINET,
    Category.SHELF,
  ],
};
