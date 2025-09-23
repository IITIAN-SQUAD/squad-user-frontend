"use client";

import { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, Download, QrCode, TrendingUp, Users, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface UpcomingDue {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid';
}

interface Payment {
  id: string;
  amount: number;
  date: string;
  method: 'Online' | 'Cash';
  status: 'Success' | 'Pending' | 'Failed';
  transactionId?: string;
}

const mockUpcomingDues: UpcomingDue[] = [
  {
    id: 'due1',
    description: 'Term 2 Fees',
    amount: 15000,
    dueDate: '2024-08-31T00:00:00Z',
    status: 'pending',
  },
  {
    id: 'due2',
    description: 'Mock Test Series',
    amount: 2500,
    dueDate: '2024-09-15T00:00:00Z',
    status: 'pending',
  },
];

const mockPayments: Payment[] = [
  {
    id: 'pay1',
    amount: 15000,
    date: '2024-07-10T10:30:00Z',
    method: 'Online',
    status: 'Success',
    transactionId: 'TXN123456789',
  },
  {
    id: 'pay2',
    amount: 5000,
    date: '2024-06-20T14:00:00Z',
    method: 'Cash',
    status: 'Success',
  },
  {
    id: 'pay3',
    amount: 10000,
    date: '2024-05-15T11:45:00Z',
    method: 'Online',
    status: 'Success',
    transactionId: 'TXN987654321',
  },
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export default function FeePortalPage() {
  const [payments, setPayments] = useState(mockPayments);
  const [dues, setDues] = useState(mockUpcomingDues);
  const [customAmount, setCustomAmount] = useState('');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showQRCode, setShowQRCode] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  const totalAmountPaid = payments.reduce((acc, p) => acc + (p.status === 'Success' ? p.amount : 0), 0);

  const handlePay = (amount: number, description: string) => {
    if (amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    setPaymentAmount(amount.toString());
    setShowPaymentDialog(true);
  };

  const handlePayment = () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    if (paymentMethod === 'upi') {
      setShowQRCode(true);
      setTransactionId(`TXN${Date.now()}`);
      setPaymentStatus('pending');
      
      // Simulate UPI payment processing
      setTimeout(() => {
        setPaymentStatus('success');
        setTimeout(() => {
          setShowQRCode(false);
          setShowPaymentDialog(false);
          
          // Add new payment to history
          const newPayment: Payment = {
            id: Date.now().toString(),
            amount: parseFloat(paymentAmount),
            date: new Date().toISOString(),
            method: 'Online',
            status: 'Success',
            transactionId: transactionId
          };
          
          setPayments([newPayment, ...payments]);
          setPaymentAmount('');
          setUpiId('');
        }, 2000);
      }, 3000);
    } else {
      // Handle other payment methods
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        setShowConfirmation(true);
        setCountdown(5);
        
        const timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              setShowConfirmation(false);
              setShowPaymentDialog(false);
              
              const newPayment: Payment = {
                id: Date.now().toString(),
                amount: parseFloat(paymentAmount),
                date: new Date().toISOString(),
                method: 'Online',
                status: 'Success',
                transactionId: `TXN${Date.now()}`
              };
              
              setPayments([newPayment, ...payments]);
              setPaymentAmount('');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <Link href="../" className="flex items-center text-sm text-gray-600 hover:text-brand-navy font-medium mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-brand-navy">Fee Management</h1>
          <p className="text-gray-500 mt-1">View your payment history, pay upcoming dues, and manage your fees.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Payment Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Dues */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Dues</CardTitle>
                <CardDescription>These are the upcoming payments requested by your teachers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dues.filter(d => d.status === 'pending').map(due => (
                  <div key={due.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border">
                    <div>
                      <p className="font-semibold text-brand-navy">{due.description}</p>
                      <p className="text-sm text-gray-500">Due by: {formatDate(due.dueDate)}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-xl font-bold text-brand-navy">₹{due.amount.toLocaleString()}</p>
                       <Button size="sm" className="mt-1" onClick={() => handlePay(due.amount, due.description)}>
                         <Wallet className="h-4 w-4 mr-2" />
                         Pay Now
                       </Button>
                    </div>
                  </div>
                ))}
                 {dues.filter(d => d.status === 'pending').length === 0 && (
                    <p className="text-center text-gray-500 py-4">No pending dues.</p>
                )}
              </CardContent>
            </Card>

            {/* Custom Payment */}
            <Card>
              <CardHeader>
                <CardTitle>Make a Custom Payment</CardTitle>
                <CardDescription>Pay any other amount towards your fees.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center space-x-4">
                <Input 
                  type="number" 
                  placeholder="Enter amount" 
                  className="max-w-xs text-lg" 
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
                <Button size="lg" onClick={() => handlePay(Number(customAmount), 'Custom Payment')}>
                  Proceed to Pay
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Summary & History */}
          <div className="space-y-8">
            {/* Total Paid */}
            <Card className="bg-brand-navy text-white">
              <CardHeader>
                <CardTitle className="flex items-center"><CheckCircle className="h-5 w-5 mr-2"/>Total Amount Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">₹{totalAmountPaid.toLocaleString()}</p>
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {payments.map(payment => (
                  <div key={payment.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">₹{payment.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{formatDate(payment.date)}</p>
                    </div>
                    <Badge variant={payment.method === 'Online' ? 'default' : 'secondary'}>{payment.method}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Payment</DialogTitle>
            <DialogDescription>
              This payment goes directly to your coaching institute. IITIAN SQUAD does not take any commission.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 text-center space-y-4">
            {isProcessing && (
              <div className="flex flex-col items-center space-y-2">
                <Clock className="h-12 w-12 text-yellow-500 animate-spin" />
                <p className="font-semibold">Processing Payment...</p>
                <p className="text-sm text-gray-500">Please wait while we confirm your transaction.</p>
              </div>
            )}
            {paymentStatus === 'success' && (
              <div className="flex flex-col items-center space-y-2">
                <CheckCircle className="h-12 w-12 text-green-500" />
                <p className="font-semibold">Payment Successful!</p>
                <p className="text-sm text-gray-500">Your payment of ₹{parseFloat(paymentAmount).toLocaleString()} has been received.</p>
                <Button onClick={() => setShowPaymentDialog(false)} className="mt-4">Done</Button>
              </div>
            )}
            {paymentStatus === 'pending' && !isProcessing && (
              <>
                <p className="text-sm text-gray-600">Scan the QR code with your UPI app to pay</p>
                <p className="text-2xl font-bold">₹{parseFloat(paymentAmount).toLocaleString()}</p>
                <div className="flex justify-center">
                  {/* Replace with a real QR code image */}
                  <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                     <QrCode className="h-24 w-24 text-gray-500"/>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Waiting for payment confirmation...</p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
