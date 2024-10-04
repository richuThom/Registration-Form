import React, { useState } from 'react';

interface RegisterCardFormProps {
    onSubmit: (data: { cardNumber: string; cvv: string; expiry: string }) => void;
  }
const RegisterCardForm: React.FC<RegisterCardFormProps> = ({ onSubmit }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiry, setExpiry] = useState('');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ cardNumber, cvv, expiry });
      console.log('Form submitted:', cardNumber,cvv,expiry);
      // Reset form
      setCardNumber('');
      setCvv('');
      setExpiry('');
  };
  // Format card number (4-digit blocks with space)
  const formatCardNumber = (value: string) => {
    return value
        .replace(/\D/g, '') // Remove non-digits
        .replace(/(\d{4})(?=\d)/g, '$1 ') // Add space after every 4 digits
        .trim();
};

// Format expiry as MM/YY
const formatExpiry = (value: string) => {
    return value
        .replace(/\D/g, '') // Remove non-digits
        .replace(/(\d{2})(\d{2})/, '$1/$2') // Format as MM/YY
        .slice(0, 5); // Limit to 5 characters
};

  
  return (
    <div className="container">
        
      <h2>Welcome Richu</h2>
      <form onSubmit={handleSubmit}>
      <label htmlFor="cardNumber">Card Number</label>
                <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength={19} // 16 digits + 3 spaces
                    placeholder="1234 5678 1234 5678"
                    required
                />
                <br />
                
                <label htmlFor="cvv">CVV
                <input
                    type="password"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))} // Only digits
                    maxLength={4} // Limit to 4 digits
                    placeholder="123"
                    required
                />
                
                <br />
                </label>
                <label htmlFor="expiry">Expiry Date
                <input
                    type="text"
                    id="expiry"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    maxLength={5} // MM/YY format
                    placeholder="MM/YY"
                    required
                />
                 </label>
                <br />
                <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterCardForm;