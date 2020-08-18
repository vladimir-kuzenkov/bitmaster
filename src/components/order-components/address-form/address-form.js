import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { renderedAddressChanged } from "../../../actions";

import "./address-form.css";



class AddressForm extends Component {
    
    handleSubmit = (e) => e.preventDefault();
    
    handleChange = (e) => this.props.renderedAddressChanged(e.target.value);
    
    
    render() {
        
        const { renderedAddress, prompt, orderCreated } = this.props;
        
        return (
            <Fragment>
                <form className="address-form" onSubmit={this.handleSubmit} >
                    <label className="address__label">Откуда
                        <input className="address__input" placeholder="Пушкинская, 1"
                               disabled={orderCreated}
                               value={renderedAddress}
                               onChange={this.handleChange} />
                    </label>
                </form>
                <span className="address-form__prompt prompt">{prompt}</span>
            </Fragment>
        )
    }
}


const mapStateToProps = ({ renderedAddress, prompt, orderCreated }) => {
    return { renderedAddress, prompt, orderCreated }
};

const mapDispatchToProps = (dispatch) => {
    return {
        renderedAddressChanged: (address) => dispatch(renderedAddressChanged(address))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(AddressForm)
