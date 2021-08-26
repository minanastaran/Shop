import {
    SET_LANGUAGE_TEXT
} from '../Constants/constants';

const initialState = {
    lang: "fa",
};

export default function changeLanguage(state = initialState, { type, payload }) {
    switch (type) {
        case SET_LANGUAGE_TEXT:
            return {
                ...state,
                lang: payload,
            };
        default:
            return state;
    }
}