'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { pricingTiers } from '@/lib/mockData'
import {
  Check,
  CreditCard,
  Lock,
  Mail,
  User,
  Calendar,
  Zap,
  Crown,
  Building
} from 'lucide-react'

interface SubscriptionModalProps {
  children: React.ReactNode
  selectedTier?: string
}

export default function SubscriptionModal({ children, selectedTier = 'pro' }: SubscriptionModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState(selectedTier)
  const [isAnnual, setIsAnnual] = useState(false)

  const tier = pricingTiers.find(t => t.id === selectedPlan) || pricingTiers[1]

  const finalPrice = isAnnual ? Math.round(tier.price * 10) : tier.price
  const savings = isAnnual ? Math.round(tier.price * 2) : 0

  const getIcon = (planId: string) => {
    switch (planId) {
      case 'free': return <Zap className="w-5 h-5" />
      case 'pro': return <Crown className="w-5 h-5" />
      case 'enterprise': return <Building className="w-5 h-5" />
      default: return <Crown className="w-5 h-5" />
    }
  }

  const handleStepNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="glass max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl gradient-text">
            Stay Ahead of the Curve
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose your learning plan and unlock the future of AI education
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Plan Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 p-4 rounded-lg bg-white/5">
              <span className={`text-sm ${!isAnnual ? 'text-white font-medium' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isAnnual ? 'bg-gradient-to-r from-teal-500 to-purple-600' : 'bg-white/20'
                }`}
              >
                <div
                  className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
              <span className={`text-sm ${isAnnual ? 'text-white font-medium' : 'text-muted-foreground'}`}>
                Annual
              </span>
              {isAnnual && (
                <Badge className="bg-green-500/20 text-green-400 text-xs">
                  Save 2 months
                </Badge>
              )}
            </div>

            {/* Plan Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              {pricingTiers.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    selectedPlan === plan.id
                      ? 'ring-2 ring-teal-500 bg-card glow-teal'
                      : 'glass hover-lift'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-teal-500 to-purple-600 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-purple-600">
                        {getIcon(plan.id)}
                      </div>
                      <div>
                        <h3 className="font-heading text-lg text-white">{plan.name}</h3>
                        <p className="text-xs text-muted-foreground">{plan.description}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-teal-400">
                          ${isAnnual ? Math.round(plan.price * 10) : plan.price}
                        </span>
                        <span className="text-muted-foreground">/{isAnnual ? 'year' : 'month'}</span>
                      </div>
                      {isAnnual && plan.price > 0 && (
                        <div className="text-sm text-green-400">
                          Save ${Math.round(plan.price * 2)} per year
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 mb-6">
                      {plan.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white">{feature}</span>
                        </div>
                      ))}
                      {plan.features.length > 4 && (
                        <div className="text-sm text-muted-foreground">
                          +{plan.features.length - 4} more features
                        </div>
                      )}
                    </div>

                    {selectedPlan === plan.id && (
                      <div className="absolute inset-0 rounded-lg border-2 border-teal-500 pointer-events-none" />
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-end">
              <Button onClick={handleStepNext} className="btn-futuristic">
                Continue to Details
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Account Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Account Form */}
              <div className="space-y-4">
                <h3 className="font-heading text-lg text-white mb-4">Account Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      className="pl-10 bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a secure password"
                      className="pl-10 bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h3 className="font-heading text-lg text-white mb-4">Order Summary</h3>
                <Card className="glass p-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-purple-600">
                      {getIcon(selectedPlan)}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{tier.name}</h4>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>
                  </div>

                  <Separator className="bg-white/20" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {isAnnual ? 'Annual' : 'Monthly'} subscription
                      </span>
                      <span className="text-white">${finalPrice}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-400">Annual discount</span>
                        <span className="text-green-400">-${savings}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="text-white">$0.00</span>
                    </div>
                  </div>

                  <Separator className="bg-white/20" />

                  <div className="flex justify-between font-medium">
                    <span className="text-white">Total</span>
                    <span className="text-teal-400 text-lg">${finalPrice}</span>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Billed {isAnnual ? 'annually' : 'monthly'}. Cancel anytime.
                  </div>
                </Card>
              </div>
            </div>

            <div className="flex justify-between">
              <Button onClick={handleStepBack} variant="outline" className="glass text-white border-white/20">
                Back
              </Button>
              <Button onClick={handleStepNext} className="btn-futuristic">
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Payment Form */}
              <div className="space-y-4">
                <h3 className="font-heading text-lg text-white mb-4">Payment Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-white">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="pl-10 bg-white/5 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry" className="text-white">Expiry Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        className="pl-10 bg-white/5 border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-white">CVV</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="cvv"
                        placeholder="123"
                        className="pl-10 bg-white/5 border-white/20 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/20 border border-green-500/30">
                  <Lock className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">
                    Your payment is secured with 256-bit SSL encryption
                  </span>
                </div>
              </div>

              {/* Final Summary */}
              <div>
                <h3 className="font-heading text-lg text-white mb-4">Final Summary</h3>
                <Card className="glass p-6 space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-400 mb-2">
                      ${finalPrice}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {tier.name} Plan • {isAnnual ? 'Annual' : 'Monthly'} Billing
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-white">What's included:</h4>
                    {tier.features.slice(0, 5).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-teal-400" />
                        <span className="text-white">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    • 30-day money-back guarantee<br />
                    • Cancel anytime<br />
                    • Instant access to all features
                  </div>
                </Card>
              </div>
            </div>

            <div className="flex justify-between">
              <Button onClick={handleStepBack} variant="outline" className="glass text-white border-white/20">
                Back
              </Button>
              <Button
                onClick={() => {
                  // Handle successful subscription
                  setIsOpen(false)
                  setCurrentStep(1)
                }}
                className="btn-futuristic"
              >
                Complete Subscription
              </Button>
            </div>
          </div>
        )}

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-colors ${
                step === currentStep
                  ? 'bg-teal-500'
                  : step < currentStep
                  ? 'bg-teal-500'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}