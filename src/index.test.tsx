type Tile = {
  title: string;
  description: string;
  id: number;
};

const apple: Tile = {
  title: "apple",
  description: "charlie",
  id: 1,
};

const banana: Tile = {
  title: "banana",
  description: "alpha",
  id: 2,
};

const carrot: Tile = {
  title: "carrot",
  description: "banana",
  id: 3,
};

export const sortTiles = (
  tiles: Tile[],
  property: keyof Tile,
  isDescending?: boolean
): Tile[] => {
  return [...tiles].sort((a, b) => {
    if (a[property] > b[property]) return isDescending ? -1 : 1;
    if (a[property] < b[property]) return isDescending ? 1 : -1;
    return 0;
  });
};

describe("sort function", () => {
  it("should sort by Title in Ascending order", () => {
    const shuffledOrder = [banana, carrot, apple];
    const sortedOrder = [apple, banana, carrot];

    const result = sortTiles(shuffledOrder, "title");

    expect(result).toStrictEqual(sortedOrder);
  });

  it("should sort by Description in Ascending order", () => {
    const shuffledOrder = [carrot, apple, banana];
    const sortedOrder = [banana, carrot, apple];

    const result = sortTiles(shuffledOrder, "description");

    expect(result).toStrictEqual(sortedOrder);
  });

  it("should sort by Title in Ascending order", () => {
    const shuffledOrder = [banana, carrot, apple];
    const sortedOrder = [apple, banana, carrot];

    const result = sortTiles(shuffledOrder, "id");

    expect(result).toStrictEqual(sortedOrder);
  });

  it("should sort by Title in Descending order", () => {
    const shuffledOrder = [apple, carrot, banana];
    const sortedOrder = [carrot, banana, apple];

    const result = sortTiles(shuffledOrder, "title", true);

    expect(result).toStrictEqual(sortedOrder);
  });
});
