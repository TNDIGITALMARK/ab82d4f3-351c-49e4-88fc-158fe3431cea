'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import SubscriptionModal from '@/components/SubscriptionModal'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { pricingTiers } from '@/lib/mockData'
import {
  Check,
  X,
  Zap,
  Crown,
  Building,
  ChevronRight,
  MessageCircle,
  Mail,
  Phone
} from 'lucide-react'

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  const getIcon = (planId: string) => {
    switch (planId) {
      case 'free': return <Zap className="w-6 h-6 text-white" />
      case 'pro': return <Crown className="w-6 h-6 text-white" />
      case 'enterprise': return <Building className="w-6 h-6 text-white" />
      default: return <Crown className="w-6 h-6 text-white" />
    }
  }

  const allFeatures = [
    'Course library access',
    'Mobile app access',
    'Community forum',
    'Basic certificates',
    'AI news updates',
    'Hands-on projects',
    'Code review & feedback',
    'Expert mentorship',
    'Priority support',
    'Advanced certificates',
    'Career guidance',
    'Networking events',
    'Team dashboard',
    'Custom learning paths',
    'API access',
    'White-label certificates',
    'Dedicated account manager',
    'Custom integrations',
    '24/7 technical support'
  ]

  const getFeatureAvailability = (feature: string, planId: string) => {
    const plan = pricingTiers.find(p => p.id === planId)
    if (!plan) return false

    // Check if feature is in the plan's features or not in limitations
    return plan.features.some(f => f.toLowerCase().includes(feature.toLowerCase().split(' ')[0])) ||
           !plan.limitations.some(l => l.toLowerCase().includes(feature.toLowerCase().split(' ')[0]))
  }

  return (
    <div className="min-h-screen bg-background neural-bg">
      <Navigation />

      {/* Header */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-5xl mb-4">
            <span className="gradient-text">Choose Your Path</span><br />
            <span className="text-white">to AI Mastery</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Flexible pricing options designed to scale with your learning journey.
            From curious beginners to enterprise teams, we have the perfect plan for you.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 p-4 rounded-lg glass mb-12">
            <span className={`text-lg ${!isAnnual ? 'text-white font-medium' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isAnnual ? 'bg-gradient-to-r from-teal-500 to-purple-600' : 'bg-white/20'
              }`}
            >
              <div
                className={`absolute w-6 h-6 bg-white rounded-full top-0.5 transition-transform ${
                  isAnnual ? 'translate-x-7' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span className={`text-lg ${isAnnual ? 'text-white font-medium' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge className="bg-green-500/20 text-green-400 ml-4 font-semibold">
                Save up to 20%
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingTiers.map((tier) => {
              const finalPrice = isAnnual ? Math.round(tier.price * 10) : tier.price
              const originalPrice = isAnnual ? Math.round(tier.price * 12) : null
              const savings = originalPrice ? originalPrice - finalPrice : 0

              return (
                <Card
                  key={tier.id}
                  className={`relative overflow-hidden ${
                    tier.popular
                      ? 'ring-2 ring-teal-500 bg-card glow-teal scale-105'
                      : 'glass hover-lift'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-purple-600" />
                  )}

                  <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                      {tier.popular && (
                        <Badge className="mb-4 bg-gradient-to-r from-teal-500 to-purple-600 text-white px-4 py-2 font-semibold">
                          Most Popular
                        </Badge>
                      )}

                      <div className="p-3 rounded-full bg-gradient-to-br from-teal-500 to-purple-600 glow-teal w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        {getIcon(tier.id)}
                      </div>

                      <h3 className="font-heading text-2xl mb-2 text-white">{tier.name}</h3>
                      <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>

                      <div className="mb-4">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-bold text-teal-400">
                            ${finalPrice}
                          </span>
                          <span className="text-muted-foreground">
                            /{isAnnual ? 'year' : 'month'}
                          </span>
                        </div>
                        {savings > 0 && (
                          <div className="text-sm text-green-400 mt-1">
                            Save ${savings} compared to monthly
                          </div>
                        )}
                        {originalPrice && (
                          <div className="text-sm text-muted-foreground line-through mt-1">
                            Was ${originalPrice}/year
                          </div>
                        )}
                      </div>

                      <SubscriptionModal selectedTier={tier.id}>
                        <Button
                          className={`w-full mb-6 ${
                            tier.popular
                              ? 'btn-futuristic'
                              : tier.id === 'enterprise'
                              ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                              : 'glass text-white border-white/20 hover:bg-white/10'
                          }`}
                          size="lg"
                        >
                          {tier.cta}
                          {tier.id !== 'enterprise' && <ChevronRight className="w-4 h-4 ml-2" />}
                        </Button>
                      </SubscriptionModal>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Everything included:</h4>
                      <div className="space-y-3">
                        {tier.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-white">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {tier.limitations.length > 0 && (
                        <>
                          <Separator className="bg-white/10 my-4" />
                          <div className="space-y-3">
                            {tier.limitations.map((limitation, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{limitation}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-gradient-to-r from-card/30 to-card/10 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl mb-4">
              <span className="text-white">Compare All Features</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See exactly what's included in each plan
            </p>
          </div>

          <Card className="glass overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 font-medium text-white">Features</th>
                    {pricingTiers.map((tier) => (
                      <th key={tier.id} className="text-center p-4">
                        <div className="flex flex-col items-center">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-purple-600 mb-2">
                            {getIcon(tier.id)}
                          </div>
                          <span className="font-medium text-white">{tier.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((feature, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="p-4 text-white">{feature}</td>
                      {pricingTiers.map((tier) => (
                        <td key={tier.id} className="p-4 text-center">
                          {getFeatureAvailability(feature, tier.id) ? (
                            <Check className="w-5 h-5 text-teal-400 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-400 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl mb-4">
              <span className="text-white">Frequently Asked Questions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="glass p-6">
              <h3 className="font-medium text-white mb-3">Can I change plans anytime?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately
                and we'll prorate the billing accordingly.
              </p>
            </Card>

            <Card className="glass p-6">
              <h3 className="font-medium text-white mb-3">Do you offer refunds?</h3>
              <p className="text-sm text-muted-foreground">
                We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied,
                we'll refund your payment in full.
              </p>
            </Card>

            <Card className="glass p-6">
              <h3 className="font-medium text-white mb-3">What payment methods do you accept?</h3>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards, PayPal, and wire transfers for enterprise customers.
                All payments are processed securely.
              </p>
            </Card>

            <Card className="glass p-6">
              <h3 className="font-medium text-white mb-3">Is there a free trial?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! Our Free Explorer plan gives you access to 3 courses and basic features.
                Pro and Enterprise plans include a 7-day free trial.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 neural-lines">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-4xl mb-4">
              <span className="text-white">Need a Custom Plan?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              For large organizations or custom requirements, we offer tailored solutions.
              Get in touch with our team to discuss your needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="btn-futuristic">
                <Mail className="w-5 h-5 mr-2" />
                Contact Sales
              </Button>
              <Button size="lg" variant="outline" className="glass text-white border-white/20 hover:bg-white/10">
                <MessageCircle className="w-5 h-5 mr-2" />
                Live Chat
              </Button>
            </div>

            <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>sales@ailearninghub.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}