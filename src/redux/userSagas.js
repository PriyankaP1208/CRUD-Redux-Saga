import { take, takeEvery, takeLatest, put, all, delay, fork, call } from 'redux-saga/effects'
import * as types from './actionType';
import { loadUsersSuccess, loadUsersError, createUsersError, createUsersSuccess, deleteUsersSuccess, deleteUsersError, updateUsersSuccess, updateUsersError } from './action'
import { loadUsersApi, createUsersApi, deleteUsersApi, updateUsersApi } from './api'

function* onLoadUsersStartAsync() {
    try{
        const response = yield call(loadUsersApi);
        if(response.status === 200) {
            yield delay(500);
            yield put(loadUsersSuccess(response.data));
        }
    }catch(error) {
        yield put(loadUsersError(error.response.data));
    }
}

function* onCreateUsersStartAsync({payload}) {
    try{
        const response = yield call(createUsersApi, payload);
        if(response.status === 200) {
            yield put(createUsersSuccess(response.data));
        }
    }catch(error) {
        yield put (createUsersError(error.response.data));
    }
}

function* onDeleteUsersStartAsync(userId) {
    try{
        console.log(userId);
        const response = yield call(deleteUsersApi, userId);
        if(response.status === 200) {
            yield put(deleteUsersSuccess(userId));
        }
    }catch(error) {
        yield put(deleteUsersError(error.response.data));
    }
}

function* onUpdateUsersStartAsync({payload: {id, formValue}}) {
    try {
        const response = yield call(updateUsersApi, id, formValue);
        if(response.status === 200) {
            yield put(updateUsersSuccess())
        }
    }catch(error){
        yield put(updateUsersError(error.response.data));
    }
}

function* onLoadUsers() {
    yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}


function* onCreateUsers() {
    yield takeLatest(types.CREATE_USERS_START, onCreateUsersStartAsync);
}

function* onDeleteUsers() {
    while(true) {
        const {payload : userId} = yield take(types.DELETE_USERS_START);
        yield call(onDeleteUsersStartAsync, userId)
    }
    
}

function* onUpdateUsers() {
    yield takeLatest(types.UPDATE_USERS_START, onUpdateUsersStartAsync);
}

const userSagas = [fork(onLoadUsers), fork(onCreateUsers), fork(onDeleteUsers), fork(onUpdateUsers)];

export default function* rootSaga() {
    yield all([...userSagas]);
}