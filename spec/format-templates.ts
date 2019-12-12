import * as joi from 'joi';

export const eachHouseOnMatrixPageTemplate = joi.object().keys({
    success: joi.boolean().invalid(false).required(),
    error: joi.valid(null).required(),
    data: {
        familyData: joi.string().required(),
        familyName: joi.string().required(),
        activeThing: {
            originPlural: joi.string().required(),
            originThingName: joi.string().required(),
            plural: joi.string().required(),
            thingName: joi.string().required(),
            _id: joi.string().required()
        },
        country: {
            alias: joi.string().required(),
            country: joi.string().required(),
            originName: joi.string().required(),
            _id: joi.string().required()
        },
        familyImage: {
            thing: joi.string().required().optional(),
            url: joi.string().required().optional(),
            _id: joi.string().required().optional()
        },
        houseImage: joi.any(),
        photographer: {
            id: joi.string().required(),
            name: joi.string().required()
        }
    }
});

export const allHousesOnMatrixPageTemplate = joi.object().keys({
    background: joi.string().required(),
    country: joi.string().required(),
    date: joi.string().required(),
    image: joi.string().required(),
    income: joi.number().required(),
    incomeQuality: joi.number().required(),
    lat: joi.number().required(),
    lng: joi.number().required(),
    region: joi.string().required(),
    showIncome: joi.number().required(),
    _id: joi.string().required()
});

export const eachHousePageDataTemplate = joi.object().keys({
    success: joi.boolean().invalid(false).required(),
    error: joi.valid(null).required(),
    msg: joi.array().required(),
    data: {
        images: joi.array().items().allow(
            {
                background: joi.string().required(),
                plural: joi.string().required(),
                thing: joi.string().required(),
                thingCategory: joi.string().required(),
                thingIcon: joi.string().required(),
                thingName: joi.string().required(),
                _id: joi.string().required()
            }
        ),
        photographer: {
            _id: joi.string().required(),
            firstName: joi.string().required(),
            lastName: joi.string().required()
        }
    },
    houseId: joi.any()
});

export const eachHouseHeaderInfoTemplate = joi.object().keys({
    success: joi.boolean().invalid(false).required(),
    error: joi.valid(null).required(),
    msg: joi.array().required(),
    data: {
        familyInfo: joi.string().required(),
        familyInfoSummary: joi.string().required(),
        familyName: joi.string().required(),
        familyThingId: joi.string().required(),
        image: joi.string().required(),
        income: joi.number().required(),
        _id: joi.string().required(),
        aboutData: joi.string().required(),
        author: joi.string().required(),
        commonAboutData: joi.any(),
        country:
            {
                alias: joi.string().required(),
                lat: joi.number().required(),
                lng: joi.number().required(),
                originName: joi.string().required(),
                region: joi.string().required(),
                _id: joi.string().required()
            },
        thing: {
            originPlural: joi.string().required(),
            originThingName: joi.string().required(),
            plural: joi.string().required(),
            thingName: joi.string().required(),
            _id: joi.string().required()
        }
    },
    houseId: joi.any()
});