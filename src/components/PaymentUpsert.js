import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import {
  paymentDoneAction,
  updatePaymentAction,
} from "../redux/PaymentReducer";

export function PaymentUpsert() {
  const dispatch = useDispatch();
  // const history = useHistory();

  const state = useSelector((state) => state);
  console.log(state);

  const [policyId, setPolicyId] = useState(state.payment.refemp.policyId);
  const [amount, setAmount] = useState(state.payment.refemp.amount);
  const [date, setDate] = useState(state.payment.refemp.date);

  //Adding Card Details
  const [cardNumber, setCardNumber] = useState(state.payment.refemp.cardNumber);
  const [cvvNumber, setCvvNumber] = useState(state.payment.refemp.cvvNumber);
  const [expiryDate, setExpiryDate] = useState(state.payment.refemp.expiryDate);

  const [successOperation, setSuccessOperation] = useState(false);
  const [errorOperation, setErrorOperation] = useState(false);

  const updatePolicyId = (e) => setPolicyId(e.target.value);
  const updateAmount = (e) => setAmount(e.target.value);
  const updateDate = (e) => setDate(e.target.value);

  //Card Details
  const updateCardNumber = (e) => setCardNumber(e.target.value);
  const updateCvvNumber = (e) => setCvvNumber(e.target.value);
  const updateExpiryDate = (e) => setExpiryDate(e.target.value);

  const PaymentDone = (e) => {
    e.preventDefault();
    console.log(policyId, amount, date, cardNumber, cvvNumber, expiryDate);

    // Validations
    const re = /^[0-9]+$/;
    if (!re.test(amount)) {
      alert("Invalid Amount");
      return;
    }

    const re1 = /^[0-9]+$/;
    if (!re1.test(policyId)) {
      alert("Invalid Policy Id");
      return;
    }

    const re2 = /^[0-9]+$/;
    if (!re2.test(cardNumber)) {
      alert("Invalid Card Number");
      return;
    }

    const re3 = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
    if (!re3.test(expiryDate)) {
      alert("Invalid Expiry Date");
      return;
    }

    // THIS IS REDUX ACTION CALLING
    dispatch(
      paymentDoneAction({
        policyId,
        amount,
        date,
        cardNumber,
        cvvNumber,
        expiryDate,
      })
    );

    // A1 success
    setSuccessOperation(true);
    setTimeout(() => setSuccessOperation(false), 5000);

    // history.push("/list-employee");

    setPolicyId("");
    setAmount("");
    setDate("");
    setCardNumber("");
    setCvvNumber("");
    setExpiryDate("");
  };

  const updatePayment = () => {
    dispatch(
      updatePaymentAction({
        id: state.payment.refemp.id,
        policyId,
        amount,
        date,
        cardNumber,
        cvvNumber,
        expiryDate,
      })
    );

    setPolicyId("");
    setAmount("");
    setDate("");
    setCardNumber("");
    setCvvNumber("");
    setExpiryDate("");
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#d9ecd0" }}>
      <div className="row">
        <div className="col-3 col-md-3 d-none d-md-block"></div>
        <div className="col-12 col-md-6">
          <h3 className="text-center alert alert-primary">
            {state.payment.refemp.id ? "Update Payment" : "Payment"}
          </h3>

          {successOperation && (
            <div className="alert alert-success">Payment Successful</div>
          )}

          {/* <form ref={formEL} class="needs-validation" novalidate> */}
          <div className="mb-1">
            <input
              type="text"
              value={policyId}
              onChange={(e) => updatePolicyId(e)}
              className="form-control mb-2"
              placeholder="Enter PolicyId"
              required
            />
          </div>
          <div className="mb-1">
            <input
              type="text"
              value={amount}
              onChange={(e) => updateAmount(e)}
              className="form-control mb-2"
              placeholder="Enter Amount"
              required
            />
          </div>

          <div className="mb-1">
            <input
              type="date"
              value={date}
              onChange={(e) => updateDate(e)}
              className="form-control mb-2"
              placeholder="Enter Date"
              required
            />
          </div>

          <h6>Enter Card Details</h6>
          <div className="mb-1">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => updateCardNumber(e)}
              className="form-control mb-2"
              placeholder="Enter Card Number"
              maxLength="16"
              minLength="4"
            />
          </div>
          <div className="mb-1">
            <input
              type="password"
              value={cvvNumber}
              onChange={(e) => updateCvvNumber(e)}
              className="form-control mb-2"
              placeholder="Enter CVV Number"
              maxLength="3"
            />
          </div>

          <div className="mb-1">
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => updateExpiryDate(e)}
              className="form-control mb-2"
              placeholder="Enter Expiry Date"
            />
          </div>

          <div className="mb-1">
            {state.payment.refemp.id ? (
              <input
                type="button"
                className="btn btn-primary w-100"
                value="Update Payment"
                onClick={() => updatePayment()}
              />
            ) : (
              <input
                type="button"
                className="btn btn-warning w-100"
                value="Pay"
                onClick={(e) => PaymentDone(e)}
              />
            )}
          </div>
          {/* </form> */}
        </div>
        <div className="col-3 col-md-3  d-none d-md-block"></div>
      </div>
    </div>
  );
}
