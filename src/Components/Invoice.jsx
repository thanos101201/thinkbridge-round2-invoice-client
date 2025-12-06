import React, { useState, useEffect } from 'react'

function InvoiceComponent() {
    const [invoices, setInvoices] = useState([]);
    
    const fetchInvoice = async () => {
        await fetch(`http://${process.env.REACT_INVOICE_SERVER_URL}/api/invoices`)
        .then(async (resp) => {
            var invoiceData = await resp.json();
            if(invoiceData){
                setInvoices(invoiceData);
            }
        }).catch((er) => console.error("Failed to load invoice.", er))
    }
    useEffect(() => {
        fetchInvoice();
    },[]);

    const renderInvoices = () => {
        if(invoices.length == 0){
            return(
                <div>Loading invoices</div>
            );
        }
        else{
            return invoices.map((invoice, key) => {
                <div key={key}>
                    <span>
                        <p>{invoice.name}</p>
                        <p>{invoice.price}</p>
                    </span>
                </div>
            })
        }
    }
  return (
    <div>
        {renderInvoices()}
    </div>
  )
}

export default InvoiceComponent