import * as request from "request-promise";
import * as joi from 'joi';
import {
    eachHouseHeaderInfoTemplate,
    eachHousePageDataTemplate
} from "./format-templates";
const getHousesListUrl = `https://www.gapminder.org/dollar-street/v1/things?lang=en&thing=Roofs&countries=World&regions=World&zoom=4&mobileZoom=4&row=3&lowIncome=13&highIncome=10813&activeHouse=11&currency=usd&time=month&resolution=480x480`;

describe('Health-check for ', () => {
    const listOfHousesIds = [];
    const listOfEachFamilyDescription = [];

    beforeEach(async () => {

        const getListOfAllFamilies = await request({method: 'GET', uri: getHousesListUrl, json: true});
        listOfHousesIds.push(...getListOfAllFamilies.data.streetPlaces.map(thing => thing._id));

        for (let houseId of listOfHousesIds) {
            const getEachFamilyList = await request({
                method: 'GET',
                uri: `https://www.gapminder.org/dollar-street/v1/home-media?placeId=${houseId}&resolution=480x480&lang=en`,
                json: true
            });

            listOfEachFamilyDescription.push({...getEachFamilyList, houseId: houseId});
        }
    }, 70000);

    it('each family data format', () => {
        const unexpectedErrors = [];

        for (let family of listOfEachFamilyDescription) {
            const expResult = joi.validate(family, eachHousePageDataTemplate);

            if (!!expResult.error) {
                unexpectedErrors.push({
                    _id: family.houseId,
                    message: expResult.error.message
                });
            }
        }

        expect(unexpectedErrors.length).toBe(0)
    });

    fit('each family header info format', async() => {
        const unexpectedErrors = [];

        for (let houseId of listOfHousesIds) {
            const houseHeaderInfo = await request({
                method: 'GET',
                uri: `https://www.gapminder.org/dollar-street/v1/home-header?placeId=${houseId}&lang=en`,
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
        console.log('________________________', unexpectedErrors, listOfHousesIds.length)
        expect(unexpectedErrors.length).toBe(0)
    }, 90000);
})