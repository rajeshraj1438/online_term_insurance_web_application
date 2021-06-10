import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  // deletePaymentAction,
  getAllPaymentAction,
  getByIdPaymentAction,
  updateRefPayment,
} from "../redux/PaymentReducer";
import { PaymentModal } from "./PaymentModal";

export function PaymentList() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(state);

  const [successOperation, setSuccessOperation] = useState(false);

  // Used to Initialize :: READ THE DATA FROM API
  useEffect(() => {
    dispatch(getAllPaymentAction());
  }, []);

  // const deletePayment = (item, index) => {
  //   dispatch(deletePaymentAction(item));

  //   setSuccessOperation(true);
  //   setTimeout(() => setSuccessOperation(false), 2000);
  // };

  const updatePayment = (item) => {
    // we are doing this so that we can access this objec in the form page
    dispatch(updateRefPayment(item));

    // form page
    history.push("/create-payment");
  };

  const getPaymentById = (item) => {
    dispatch(getByIdPaymentAction(item));
  };

  return (
    <>
      <div style={{ height: "200vh", backgroundColor: "#d9ecd0" }}>
        <div className="row">
          <div className="col-3 col-md-2 d-none d-md-block"></div>
          <div className="col-12 col-md-8">
            <h3 className="alert alert-primary text-center">Payment List</h3>

            {successOperation && (
              <div className="alert alert-primary">Operation Success</div>
            )}

            {/* <table className="table"> */}
            {/* <thead className="thead-dark"> */}
            <Table striped bordered hover variant="primary">
              <tr style={{ backgroundColor: "#0080FF" }}>
                <th scope="col">#ID</th>
                <th scope="col">POLICY ID</th>
                <th scope="col">CARD NUMBER</th>
                <th scope="col">CVV NUMBER</th>
                <th scope="col">EXPIRY DATE</th>
                <th scope="col">AMOUNT</th>
                <th scope="col">DATE OF PAYMENT</th>
                <th scope="col">ACTIONS</th>
              </tr>

              {/* </thead> */}
              <tbody>
                {[...state.payment.list].map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{item.id}</th>
                    <td>{item.policyId}</td>
                    <td>{item.cardNumber}</td>
                    <td>{item.cvvNumber}</td>
                    <td>{item.expiryDate}</td>
                    <td>{item.amount}</td>
                    <td style={{ width: "10" }}>{item.date}</td>

                    <td>
                      <input
                        type="button"
                        onClick={() => getPaymentById(item)}
                        value="Detail"
                        className="btn btn-link"
                      />
                      {/* /
                    <input
                      type="button"
                      onClick={() => updatePayment(item)}
                      value="Edit"
                      className="btn btn-link"
                    /> */}
                      {/* /
                    <input
                      type="button"
                      value="Delete"
                      onClick={() => deletePayment(item, index)}
                      className="btn btn-link text-danger"
                    /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* </table> */}
            </Table>
          </div>
          <div className="col-3 col-md-2 d-none d-md-block"></div>
        </div>
      </div>

      {/** PAYMENT MODAL */}
      <PaymentModal />
    </>
  );
}
