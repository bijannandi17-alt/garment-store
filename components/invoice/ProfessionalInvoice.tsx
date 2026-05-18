import React from "react";

interface Item {
  name: string;
  hsn: string;
  qty: number;
  price: number;
}

interface Props {
  invoiceNo: string;
  orderId: string;
  date: string;

  customerName: string;
  phone: string;
  address: string;

  items: Item[];
}

function numberToWords(num: number) {

  const ones = [
    "", "One", "Two", "Three",
    "Four", "Five", "Six",
    "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve",
    "Thirteen", "Fourteen",
    "Fifteen", "Sixteen",
    "Seventeen", "Eighteen",
    "Nineteen"
  ];

  const tens = [
    "", "", "Twenty",
    "Thirty", "Forty",
    "Fifty", "Sixty",
    "Seventy", "Eighty",
    "Ninety"
  ];

  if (num < 20)
    return ones[num];

  if (num < 100)
    return tens[Math.floor(num / 10)] +
      " " +
      ones[num % 10];

  if (num < 1000)
    return ones[Math.floor(num / 100)] +
      " Hundred " +
      numberToWords(num % 100);

  if (num < 100000)
    return numberToWords(
      Math.floor(num / 1000)
    ) +
      " Thousand " +
      numberToWords(num % 1000);

  return num.toString();
}

export default function ProfessionalInvoice({
  invoiceNo,
  orderId,
  date,

  customerName,
  phone,
  address,

  items,
}: Props) {

  const subtotal =
    items.reduce(
      (sum, item) =>
        sum +
        item.qty * item.price,
      0
    );

  const cgst =
    subtotal * 0.025;

  const sgst =
    subtotal * 0.025;

  const grandTotal =
    Math.round(
      subtotal + cgst + sgst
    );

  return (

<html>

<body
style={{
fontFamily: "Arial",
fontSize: "12px",
padding: "20px"
}}
>

{/* HEADER */}

<table
width="100%"
style={{
borderBottom: "2px solid black"
}}
>

<tr>

<td>

<img
src="logo.png"
width="140"
/>

</td>

<td align="right">

<h2>
AMRO AURA FASHION
</h2>

GSTIN: 29ABCDE1234F1Z5 <br/>

Howrah, West Bengal <br/>

Phone: 7889455612

</td>

</tr>

</table>

<h2 align="center">
TAX INVOICE
</h2>

{/* ORDER DETAILS */}

<table width="100%">

<tr>

<td>

Invoice No:
<b> {invoiceNo}</b><br/>

Order ID:
<b> {orderId}</b><br/>

Date:
<b> {date}</b>

</td>

<td align="right">

Payment Mode:
<b> Razorpay</b>

</td>

</tr>

</table>

<br/>

{/* BILL TO */}

<table
width="100%"
border={1}
cellPadding={6}
>

<tr>

<td>

<b>Bill To:</b><br/>

{customerName}<br/>

{phone}<br/>

{address}

</td>

</tr>

</table>

<br/>

{/* ITEM TABLE */}

<table
width="100%"
border={1}
cellPadding={6}
>

<tr
style={{
background: "#eee"
}}
>

<th>Item</th>

<th>HSN</th>

<th>Qty</th>

<th>Rate</th>

<th>Tax</th>

<th>Amount</th>

</tr>

{items.map(
(item, i) => {

const amount =
item.qty * item.price;

return (

<tr key={i}>

<td>{item.name}</td>

<td>{item.hsn}</td>

<td>{item.qty}</td>

<td>₹{item.price}</td>

<td>5%</td>

<td>₹{amount}</td>

</tr>

);

}
)}

</table>

{/* TOTAL */}

<br/>

<table
width="100%"
>

<tr>

<td align="right">

Subtotal:
₹{subtotal.toFixed(2)}

</td>

</tr>

<tr>

<td align="right">

CGST (2.5%):
₹{cgst.toFixed(2)}

</td>

</tr>

<tr>

<td align="right">

SGST (2.5%):
₹{sgst.toFixed(2)}

</td>

</tr>

<tr>

<td align="right">

<h3>

Grand Total:
₹{grandTotal}

</h3>

</td>

</tr>

</table>

{/* WORDS */}

<p>

<b>
Amount in Words:
</b>

<br/>

Rupees
{numberToWords(grandTotal)}
Only

</p>

{/* FOOTER */}

<table
width="100%"
>

<tr>

<td>

<b>Bank Details:</b><br/>

Bank:
State Bank of India<br/>

UPI:
sample@upi<br/>

A/C:
1234567890<br/>

IFSC:
SBIN0001234

</td>

<td align="center">

<img
src="qr.png"
width="100"
/>

</td>

<td align="right">

<img
src="signature.png"
width="120"
/>

<br/>

Authorized Signature

</td>

</tr>

</table>

<br/>

<p
style={{
fontSize: "10px"
}}
>

Return accepted within 7 days.<br/>

This is a computer-generated invoice.

</p>

</body>

</html>

);
}