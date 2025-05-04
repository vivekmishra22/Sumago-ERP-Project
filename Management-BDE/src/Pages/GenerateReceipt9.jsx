import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Button, Container, Image, Table } from "react-bootstrap";
import image1 from "../Assets/Images/SUMAGO Logo.png";

const GenerateReceipt = () => {
  const { id } = useParams();
  const [receiptData, setReceiptData] = useState(null);
  const [receiptUrl, setReceiptUrl] = useState("");
  const [total_balance, setTotalBalance] = useState(0); // ✅ State for total balance

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two digits
    const month = String(date.getMonth() + 1); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    // Fetch the specific installment receipt
    axios
      .get(`http://localhost:8000/receipt/${id}`)
      .then((res) => {
        console.log("API Response:", res.data);
        setReceiptData(res.data.receiptData);
        setReceiptUrl(`http://localhost:8000${res.data.receiptUrl}`);
      })
      .catch((err) => console.error("Error fetching receipt:", err));
  }, [id]);

  useEffect(() => {
    if (receiptData) {
      // Fetch all previous installments for the same student and course
      axios
        .get(
          `http://localhost:8000/getinstallment?student_name=${receiptData.student_name}&course_name=${receiptData.course_name}`
        )
        .then((response) => {
          const allInstallments = response.data.data;

          // Calculate the total amount paid so far
          const totalPaid = allInstallments.reduce(
            (sum, inst) => sum + inst.iamount,
            0
          );

          // Calculate remaining balance
          const newTotalBalance = receiptData.amount - totalPaid;
          setTotalBalance(newTotalBalance);
        })
        .catch((err) => console.error("Error fetching installment data:", err));
    }
  }, [receiptData]);

  return (
    <Container className="mt-4">
      {receiptData ? (
        <Card className="shadow p-4">
          <Card.Header className="text-center">
            <Image src={image1} className="mb-3 w-25 h-25" />
            <h3 className="text-center mb-4">Payment Receipt</h3>
          </Card.Header>

          <Card.Body>
            <Table striped bordered hover responsive className="mb-3">
              <tbody>
                <tr>
                  <td><strong>Receipt Number:</strong></td>
                  <td>{receiptData.receipt_number}</td>
                </tr>
                <tr>
                  <td><strong>Fees Date:</strong></td>
                  <td>{formatDate(receiptData.fees_date)}</td>
                </tr>
                <tr>
                  <td><strong>Student Name:</strong></td>
                  <td>{receiptData.student_name}</td>
                </tr>
                <tr>
                  <td><strong>Course Name:</strong></td>
                  <td>{receiptData.course_name}</td>
                </tr>
                <tr>
                  <td><strong>Installment No:</strong></td>
                  <td>{receiptData.installment_no}</td>
                </tr>
                <tr>
                  <td><strong>Duration:</strong></td>
                  <td>{receiptData.duration}</td>
                </tr>
                <tr>
                  <td><strong>Course Fees:</strong></td>
                  <td>₹{receiptData.amount}</td>
                </tr>
                <tr>
                  <td><strong>Amount Paid:</strong></td>
                  <td>₹{receiptData.iamount}</td>
                </tr>
                <tr>
                  <td><strong>Payment Method:</strong></td>
                  <td>{receiptData.payment_method}</td>
                </tr>
                <tr>
                  <td><strong>Payment Status:</strong></td>
                  <td>{receiptData.status}</td>
                </tr>
                <tr>
                  <td><strong>Total Payable:</strong></td>
                  <td>₹{receiptData.total_balance.toFixed(2)}</td> {/* ✅ Updated balance */}
                </tr>
              </tbody>
            </Table>
          </Card.Body>

          <Card.Footer className="text-center">
            <Button
              variant="success"
              href={receiptUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 Download Receipt (PDF)
            </Button>
          </Card.Footer>
        </Card>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </Container>
  );
};

export default GenerateReceipt;
