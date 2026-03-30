import { beforeEach, describe, expect, test } from "vitest";
import AxiosMockAdapter from "axios-mock-adapter";
import { getHeroByPageAction } from "./get-hero-by-page.action";
import { heroApi } from "../api/hero.api";

describe("getHeroByPage", () => {
  const heroesApiMock = new AxiosMockAdapter(heroApi);
  const BASE_URL = import.meta.env.VITE_API_URL;
  beforeEach(() => {
    heroesApiMock.reset();
  });

  test("should return default heroes", async () => {
    heroesApiMock.onGet("/").reply(200, {
      total: 10,
      pages: 2,
      heroes: [
        {
          image: "1.jpeg",
        },
        {
          image: "2.jpeg",
        },
      ],
    });
    const response = await getHeroByPageAction(1);
    expect(response).toStrictEqual({
      total: 10,
      pages: 2,
      heroes: [
        { image: `${BASE_URL}/images/1.jpeg` },
        { image: `${BASE_URL}/images/2.jpeg` },
      ],
    });
  });
  test("should return the correct heroes when page is not a number ", async () => {
    const responseObject = {
      total: 10,
      pages: 2,
      heroes: [],
    };
    heroesApiMock.onGet("/").reply(200, responseObject);
    heroesApiMock.resetHistory();
    await getHeroByPageAction("abc" as unknown as number);
    const params = heroesApiMock.history.get[0].params;
    expect(params).toEqual({ limit: 6, offset: 0, category: "all" });
  });

   test("should return the correct heroes when page is a string number ", async () => {
    const responseObject = {
      total: 10,
      pages: 2,
      heroes: [],
    };
    heroesApiMock.onGet("/").reply(200, responseObject);
    heroesApiMock.resetHistory();
    await getHeroByPageAction("5" as unknown as number);
    const params = heroesApiMock.history.get[0].params;
    expect(params).toEqual({ limit: 6, offset: 24, category: "all" });
  });
    test("should call the API with the correct parameters", async () => {
    const responseObject = {
      total: 10,
      pages: 1,
      heroes: [],
    };
    heroesApiMock.onGet("/").reply(200, responseObject);
    heroesApiMock.resetHistory();
    await getHeroByPageAction(2 ,10, "villain");
    const params = heroesApiMock.history.get[0].params;
    console.log(params);
    expect(params).toEqual({ limit: 10, offset: 10, category: "villain" });
  });
});
