import {eachHouseHeaderInfoTemplate} from "./old/format-templates";
import * as request from "request-promise";
import * as joi from 'joi';

const baseUrl = `https://www.gapminder.org/dollar-street/v1/`;
const getAllHousesListUrl = `${baseUrl}things?lang=en&thing=Roofs&countries=World&regions=World&zoom=4&mobileZoom=4&row=1&lowIncome=13&highIncome=10813&currency=usd&time=month&resolution=480x480`;

describe('Check families: ', () => {
    const listOfEachFamilyDescription = [];
    const listOfHousesIds = [];

    beforeAll(async () => {
        const getAllFamiliesList = await request({method: 'GET', uri: getAllHousesListUrl, json: true});

        listOfEachFamilyDescription.push(...getAllFamiliesList.data.streetPlaces);
        listOfHousesIds.push(...getAllFamiliesList.data.streetPlaces.map(house => house._id));
    });

    it('each family should include family thing', async() => {
        const unexpectedErrors = [];

        for (const houseId of listOfHousesIds) {
            const listOfAllItems = [];
            console.log(`Checking house with id: ${houseId}`);
            const isContainFamilyThing = await request({
                method: 'GET',
                uri: `${baseUrl}home-media?placeId=${houseId}&resolution=480x480&lang=en`,
                json: true
            }).then(result => {
                listOfAllItems.push(...result.data.images.map(things => things.thingName));

                return listOfAllItems.indexOf('Family') > -1;
            });

            if (!isContainFamilyThing) {
                unexpectedErrors.push({
                    message: `${houseId} - this house has no favorite item Family`
                });
            }
        }

        console.log(unexpectedErrors);
        expect(unexpectedErrors.length).toBe(0);
    }, 120000);

    it('data consistency for the each family page', async() => {
        const unexpectedErrors = [];

        for (let houseId of listOfHousesIds) {
            console.log(`Checking house with id: ${houseId}`);
            const houseHeaderInfo = await request({
                method: 'GET',
                uri: `${baseUrl}home-header?placeId=${houseId}&lang=en`,
                json: true
            });

            const expResult = joi.validate(houseHeaderInfo, eachHouseHeaderInfoTemplate);

            if (!!expResult.error) {
                unexpectedErrors.push({
                    _id: houseId,
                    message: expResult.error.message
                });
            }
        }

        console.log(unexpectedErrors);
        expect(unexpectedErrors.length).toBe(0)
    }, 120000);
});

