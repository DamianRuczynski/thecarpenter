export type TProject = {
  id: string;
  title: string;
  description: string;
  category: Category;
  media: Media[];
  catalogs: Catalog[];
};

export type Media = {
  category: MediaCategory;
  url: string;
};

export enum MediaCategory {
  VIDEO = 'video',
  IMAGE = 'image',
}

export type Catalog = {
  url: string;
  name: string;
};

export enum Room {
  KITCHEN = 'kitchen',
  WARDROBE = 'wardrobe',
  BATHROOM = 'bathroom',
  OFFICE = 'office',
  DRESSER = 'dresser',
  TV_STAND = 'tv_stand',
  CABINET = 'cabinet',
  BEDROOM = 'bedroom',
}

export enum Category {
  TABLE = 'table',
  KITCHEN_ACCESSORIES = 'kitchen_accessories',
  BATHROOM_ACCESSORY = 'bathroom_accessory',
  WARDROBE_ACCESSORY = 'wardrobe_accessory',
  LIVING_ROOM_ACCESSORY = 'living_room_accessory',
  TV_STAND_ACCESSORY = 'tv_stand_accessory',
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
  LAUNDRY_BASKET = 'laundry_basket',
  STOVE = 'stove',
  DESK = 'desk',
  WARDROBE = 'wardrobe',
  NIGHTSTAND = 'nightstand',
  DRESSER = 'dresser',
  COFFEE_TABLE = 'coffee_table',
  TV_STAND = 'tv_stand',
  BOOKCASE = 'bookcase',
  GLASS_SHOWCASE = 'glass_showcase',
  HANGER = 'hanger',
  ORGANIZER = 'organizer',
}

export const RoomCategories: Record<Room, Category[]> = {
  [Room.KITCHEN]: [
    Category.TABLE,
    Category.CHAIR,
    Category.CABINET,
    Category.FRIDGE,
    Category.SINK,
    Category.STOVE,
    Category.KITCHEN_ACCESSORIES,
    Category.GLASS_SHOWCASE,
  ],
  [Room.BATHROOM]: [
    Category.SINK,
    Category.BATHTUB,
    Category.SHOWER,
    Category.WASHING_MACHINE,
    Category.CABINET,
    Category.BATHROOM_ACCESSORY,
  ],
  [Room.BEDROOM]: [
    Category.BED,
    Category.WARDROBE,
    Category.DRESSER,
    Category.NIGHTSTAND,
    Category.SHELF,
    Category.GLASS_SHOWCASE,
  ],
  [Room.WARDROBE]: [
    Category.SHELF,
    Category.ORGANIZER,
    Category.WARDROBE_ACCESSORY,
  ],
  [Room.TV_STAND]: [Category.TV_STAND, Category.TV_STAND_ACCESSORY],
  [Room.OFFICE]: [
    Category.DESK,
    Category.CHAIR,
    Category.BOOKCASE,
    Category.SHELF,
  ],
  [Room.CABINET]: [Category.CABINET, Category.SHELF, Category.HANGER],
  [Room.DRESSER]: [Category.DRESSER, Category.SHELF],
};

export type MenuConfig = {
  room: Room;
  categories: Category[];
};
