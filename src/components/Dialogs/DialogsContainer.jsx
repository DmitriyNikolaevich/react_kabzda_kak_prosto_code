import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { addMessageActionCreator } from '../../redux/dialogPageReducer';
import Dialog from './Dialog/Dialog';
import Dialogs from './Dialogs';
import Message from './Message/Message'




const mapStateToProps = (state) => {
    return {
        dialogItems: state.dialogPage.dialogs.map( el => <Dialog id={el.id} key={el.id} name={el.name} />),
        messageItems: state.dialogPage.messages.map( el => <Message message={el.message} key={el.id} />),
        value: state.dialogPage.newMessageText,
        isAuth: state.auth.isAuth
    }
};

export default compose( connect(mapStateToProps, {addMessageActionCreator}), withAuthRedirect )(Dialogs);