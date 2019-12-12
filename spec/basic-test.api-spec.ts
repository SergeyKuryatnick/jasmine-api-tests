import {
    allHousesOnMatrixPageTemplate,
    eachHouseHeaderInfoTemplate,
    eachHouseOnMatrixPageTemplate
} from "./format-templates";
import * as request from "request-promise";
import * as joi from 'joi';

const baseUrl = `https://www.gapminder.org/dollar-street/v1/`;
const getAllHousesListUrl = `${baseUrl}things?lang=en&thing=Families&countries=World&regions=World&zoom=4&mobileZoom=4&row=1&lowIncome=13&highIncome=10813&currency=usd&time=month&resolution=480x480`;

describe('Health-check for ', () => {
    const listOfEachFamilyDescription = [];
    const listOfHousesIds = [];

    beforeAll(async () => {
        const getAllFamiliesList = await request({method: 'GET', uri: getAllHousesListUrl, json: true});

        listOfEachFamilyDescription.push(...getAllFamiliesList.data.streetPlaces);
        listOfHousesIds.push(...getAllFamiliesList.data.streetPlaces.map(house => house._id));
    });

    it('each house on the matrix page format', async () => {
        const unexpectedErrors = [];

        for (let house of listOfEachFamilyDescription) {
            const expResult = joi.validate(house, allHousesOnMatrixPageTemplate);

            if (!!expResult.error) {
                unexpectedErrors.push({
                    _id: house._Id,
                    message: expResult.error.message
                });
            }
        }

        expect(unexpectedErrors.length).toBe(0)
    });

    it('each house on matrix page format', async() => {
        const unexpectedErrors = [];

        for (let houseId of listOfHousesIds) {
            const getHousesUri = `${baseUrl}matrix-view-block/?placeId=${houseId}&thingId=Families&lang=en`;
            const house = await request({method: 'GET', uri: getHousesUri, json: true});

            const expResult = joi.validate(house, eachHouseOnMatrixPageTemplate);

            if (!!expResult.error) {
                unexpectedErrors.push({
                    _id: houseId,
                    message: expResult.error.message
                });
            }
        }

        expect(unexpectedErrors.length).toBe(0)
    }, 90000);

    it('each family header info format', async() => {
        const unexpectedErrors = [];

        for (let houseId of listOfHousesIds) {
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
        console.log('________________________', unexpectedErrors, listOfHousesIds.length);
        expect(unexpectedErrors.length).toBe(0)
    }, 120000);
});
