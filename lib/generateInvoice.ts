import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

/* TYPES */

interface Item {
  name: string;
  hsn: string;
  qty: number;
  price: number;
}

interface InvoiceData {
  invoiceNo: string;
  orderId: string;
  date: string;

  customerName: string;
  phone: string;
  address: string;

  items: Item[];
}

/* LOAD IMAGE */

function loadImageBase64(filename: string) {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      filename
    );

    if (fs.existsSync(filePath)) {
      return fs
        .readFileSync(filePath)
        .toString("base64");
    }
    return "";
  } catch {
    return "";
  }
}

/* NUMBER TO WORDS */

function numberToWords(num: number) {
  const ones = [
    "", "One", "Two", "Three", "Four",
    "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen",
    "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"
  ];

  const tens = [
    "", "", "Twenty", "Thirty",
    "Forty", "Fifty", "Sixty",
    "Seventy", "Eighty", "Ninety"
  ];

  function convert(n: number): string {
    if (n < 20) return ones[n];

    if (n < 100)
      return (
        tens[Math.floor(n / 10)] +
        " " +
        ones[n % 10]
      );

    if (n < 1000)
      return (
        ones[Math.floor(n / 100)] +
        " Hundred " +
        convert(n % 100)
      );

    if (n < 100000)
      return (
        convert(Math.floor(n / 1000)) +
        " Thousand " +
        convert(n % 1000)
      );

    if (n < 10000000)
      return (
        convert(Math.floor(n / 100000)) +
        " Lakh " +
        convert(n % 100000)
      );

    return num.toString();
  }

  return convert(Math.round(num)) + " Rupees Only";
}

/* MAIN */

export async function generateInvoice(
  data: InvoiceData
) {
  const logoBase64 = loadImageBase64("logo.png");
  const signBase64 = loadImageBase64("signature.png");
  const qrBase64 = loadImageBase64("qr.png");

  /* CALCULATIONS */

  /* GST-INCLUSIVE CALCULATION */
  const gross = data.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  const taxable = gross / 1.05;
  const gst = gross - taxable;
  const cgst = gst / 2;
  const sgst = gst / 2;
  const total = gross;

  // 🔥 THE FIX: Define 'subtotal' so the HTML template can find it!
  const subtotal = taxable;

  /* ROUNDING */
  const taxableRounded = Number(taxable.toFixed(2));
  const cgstRounded = Number(cgst.toFixed(2));
  const sgstRounded = Number(sgst.toFixed(2));
  const totalRounded = Number(total.toFixed(2));

  const amountWords = numberToWords(totalRounded);
  const firstHSN = data.items[0]?.hsn || "";

  /* HTML */

  const html = `
<html>
<head>
<style>
/* BODY */
body {
  font-family: Arial, sans-serif;
  padding: 25px;
  border: 2px solid #000;
  font-size: 13px;
}

/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  height: 55px;
  max-width: 180px;
  object-fit: contain;
}

.title {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
}

.sub-title {
  text-align: center;
  font-size: 12px;
}

/* TABLE */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th, td {
  border: 1px solid #000;
  padding: 8px;
}

th {
  background: #efefef;
}

/* TOTAL BOX */
.total-box {
  border: 1px solid #000;
  width: 300px;
  padding: 10px;
  float: right;
  margin-top: 15px;
}

.total-row {
  display: flex;
  justify-content: space-between;
}

/* FOOTER */
.footer-box {
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.signature {
  height: 50px;
  max-width: 180px;
  object-fit: contain;
}

.signature-line {
  border-top: 1px solid #000;
  width: 180px;
  margin: 5px auto;
}

.signature-section {
  text-align: center;
}

.qr {
  height: 100px;
}

.small {
  font-size: 11px;
}
</style>
</head>
<body>

<div class="header">
${
logoBase64
? `<img src="data:image/png;base64,${logoBase64}" class="logo"/>`
: ""
}
<div>
<div class="title">
TAX INVOICE
</div>
<div class="sub-title">
Original for Recipient
</div>
</div>
</div>

<br/>
<div style="display:flex; justify-content:space-between;">
<div>
<b>Invoice No:</b>
${data.invoiceNo}<br/>
<b>Order ID:</b>
${data.orderId}<br/>
<b>Date:</b>
${data.date}
</div>
<div>
<b>Sold By:</b><br/>
AmroAura Fashion Pvt Ltd<br/>
#12, 2nd Floor<br/>
BTM Layout 2nd Stage<br/>
Bangalore - 560076<br/>
Karnataka (29)<br/>
GSTIN: 29ABCDE1234F1Z5
</div>
</div>

<br/>
<b>Bill To:</b><br/>
${data.customerName}<br/>
${data.phone}<br/>
${data.address}<br/>
Place of Supply:
West Bengal (19)

<table>
<thead>
<tr>
<th>SL</th>
<th>Item</th>
<th>HSN</th>
<th>Qty</th>
<th>Rate</th>
<th>Amount</th>
</tr>
</thead>
<tbody>
${data.items.map((item, i) => `
<tr>
<td>${i+1}</td>
<td>${item.name}</td>
<td>${item.hsn}</td>
<td>${item.qty}</td>
<td>₹${item.price}</td>
<td>₹${item.qty * item.price}</td>
</tr>
`).join("")}
</tbody>
</table>

<div class="total-box">
<div class="total-row">
<span>Subtotal</span>
<span>₹${subtotal.toFixed(2)}</span>
</div>
<div class="total-row">
<span>CGST (2.5%)</span>
<span>₹${cgst.toFixed(2)}</span>
</div>
<div class="total-row">
<span>SGST (2.5%)</span>
<span>₹${sgst.toFixed(2)}</span>
</div>
<hr/>
<div class="total-row">
<b>Grand Total</b>
<b>₹${total.toFixed(2)}</b>
</div>
</div>
<br/><br/><br/>

<b>Amount in Words:</b><br/>
${amountWords}

<h4>HSN Summary</h4>
<table>
<tr>
<th>HSN</th>
<th>Taxable</th>
<th>CGST</th>
<th>SGST</th>
</tr>
<tr>
<td>${firstHSN}</td>
<td>₹${subtotal.toFixed(2)}</td>
<td>₹${cgst.toFixed(2)}</td>
<td>₹${sgst.toFixed(2)}</td>
</tr>
</table>

<br/>
<b>Bank Details:</b><br/>
Bank: State Bank of India<br/>
A/C No: XXXXXXXX<br/>
IFSC: SBIN000XXXX<br/>
UPI: yourupi@bank

<br/><br/>
<div class="small">
Declaration:<br/>
We declare that this invoice shows
the actual price of the goods
described and that all particulars
are true and correct.
</div>

<div class="footer-box">
<div class="signature-section">
${
signBase64
? `<img src="data:image/png;base64,${signBase64}" class="signature"/>`
: ""
}
<div class="signature-line"></div>
For AmroAura Fashion Pvt Ltd
<br/>
Authorized Signatory
</div>
${
qrBase64
? `<img src="data:image/png;base64,${qrBase64}" class="qr"/>`
: ""
}
</div>

<div class="small">
Subject to Bangalore Jurisdiction
</div>

</body>
</html>
`;

  /* PDF */
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage"
    ]
  });

  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "load",
    timeout: 60000
  });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "20px",
      bottom: "20px",
      left: "20px",
      right: "20px"
    }
  });

  await browser.close();

  return pdf;
}