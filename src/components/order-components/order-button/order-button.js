import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { awaitingOrderSetter, awaitingCancelSetter } from "../../../actions";
import Spinner from "../../spinner";

import "./order-button.css";


class OrderButton extends Component {
    
    render() {
    
        const { isValid, prompt, orderLoading, orderCreated, cancelLoading } = this.props;
        
        const orderButton =
            <Fragment>
                <button className="order-button" disabled={!isValid}
                        onClick={this.props.awaitingOrderSetter}>Заказать</button>
                <span className="order-button__prompt prompt">{prompt}</span>
            </Fragment>;
        
        const buttonEmu =
            <Fragment>
                {
                    !orderLoading ? <button className="order-button__abort"
                                            onClick={this.props.awaitingCancelSetter}>Отменить</button> : null
                }
                <div className="order-button__emu">
                    {
                        orderLoading ? <Spinner /> : <span>Ваш заказ принят, такси скоро будет</span>
                    }
                </div>
            </Fragment>;
        
        const button = orderCreated ? buttonEmu : orderButton;
        const content = orderLoading || cancelLoading ? <div className="button-wrap"> <Spinner className="small-spinner" /></div> : button;
        
        return (
            <Fragment>
                {content}
            </Fragment>
        );
    }
}

const mapStateToProps = ({ isValid, prompt, orderLoading, orderCreated, cancelLoading }) => {
    return { isValid, prompt, orderLoading, orderCreated, cancelLoading }
};

const mapDispatchToProps = (dispatch) => {
    return {
        awaitingOrderSetter: () => dispatch(awaitingOrderSetter()),
        awaitingCancelSetter: () => dispatch(awaitingCancelSetter())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderButton);
