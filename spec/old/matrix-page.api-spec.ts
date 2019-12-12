// import {allHousesOnMatrixPageTemplate, eachHouseOnMatrixPageTemplate} from "./format-templates";
// import * as request from "request-promise";
// import * as joi from 'joi';
//
// const getHousesListUrl = 'https://www.gapminder.org/dollar-street/v1/things?lang=en&thing=Families&countries=World&regions=World&zoom=4&mobileZoom=4&row=3&lowIncome=13&highIncome=10813&activeHouse=11&currency=usd&time=month&resolution=480x480';
//
// describe('Health-check for ', () => {
//     const listOfEachFamilyDescription = [];
//     const listOfHousesIds = [];
//
//     beforeEach(async() => {
//         const getAllFamiliesList = await request({method: 'GET', uri: getHousesListUrl, json: true});
//
//         listOfEachFamilyDescription.push(...getAllFamiliesList.data.streetPlaces);
//         listOfHousesIds.push(...getAllFamiliesList.data.streetPlaces.map(thing => thing._id));
//     });
//
//     it('all houses on the matrix page format', async () => {
//         const unexpectedErrors = [];
//
//         for (let house of listOfEachFamilyDescription) {
//             const expResult = joi.validate(house, allHousesOnMatrixPageTemplate);
//
//             if (!!expResult.error) {
//                 console.log('___________________________', expResult.error)
//                 unexpectedErrors.push({
//                     _id: house._Id,
//                     message: expResult.error.message
//                 });
//             }
//         }
//
//         expect(unexpectedErrors.length).toBe(0)
//     });
//
//     it('each house on matrix page format', async() => {
//         const unexpectedErrors = [];
//
//         for (let houseId of listOfHousesIds) {
//             const getHousesUri = `https://www.gapminder.org/dollar-street/v1/matrix-view-block/?placeId=${houseId}&thingId=Families&lang=en`;
//             const house = await request({method: 'GET', uri: getHousesUri, json: true});
//             const expResult = joi.validate(house, eachHouseOnMatrixPageTemplate);
//
//             if (!!expResult.error) {
//                 unexpectedErrors.push({
//                     _id: houseId,
//                     message: expResult.error.message
//                 });
//             }
//         }
//
//         expect(unexpectedErrors.length).toBe(0)
//     });
//
//
// });
