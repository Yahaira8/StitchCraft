import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PatternCatalog } from './components/PatternCatalog';
import { PatternModal } from './components/PatternModal';
import { RowCounterTool } from './components/RowCounterTool';
import { GaugeCalculatorTool } from './components/GaugeCalculatorTool';
import { StitchGuide } from './components/StitchGuide';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { CROCHET_PATTERNS } from './data/crochetData';
import { CartItem, CrochetPattern } from './types';

export const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('stitchcraft_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedPattern, setSelectedPattern] = useState<CrochetPattern | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [counterProject, setCounterProject] = useState<{
    name: string;
    section: string;
    totalRounds: number;
  } | null>(null);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('stitchcraft_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (
    pattern: CrochetPattern,
    type: 'digital' | 'kit',
    colorScheme = 'Terracotta Hearth',
    includeHook = false
  ) => {
    const basePrice = type === 'digital' ? pattern.priceDigital : pattern.priceKit;
    const finalPrice = basePrice + (includeHook ? 8 : 0);
    const cartItemId = `${pattern.id}-${type}-${colorScheme}-${includeHook ? 'hook' : 'nohook'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          patternId: pattern.id,
          title: pattern.title,
          type,
          price: finalPrice,
          quantity: 1,
          colorScheme,
          includeHook,
          image: pattern.image,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLoadIntoCounter = (pattern: CrochetPattern) => {
    setCounterProject({
      name: pattern.title,
      section: pattern.sampleInstructions[0]?.sectionName || 'Foundation',
      totalRounds: 36,
    });
    setSelectedPattern(null);
    handleNavigate('row-counter');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#292524] flex flex-col font-sans selection:bg-[#E8D9CD]">
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      <main className="flex-1">
        <Hero
          onExplore={() => handleNavigate('patterns')}
          onOpenCounter={() => handleNavigate('row-counter')}
        />

        <PatternCatalog
          patterns={CROCHET_PATTERNS}
          onSelectPattern={(pattern) => setSelectedPattern(pattern)}
          onAddToCart={handleAddToCart}
        />

        <RowCounterTool initialProject={counterProject} />

        <GaugeCalculatorTool />

        <StitchGuide />
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Pattern Detail Modal */}
      <PatternModal
        pattern={selectedPattern}
        onClose={() => setSelectedPattern(null)}
        onAddToCart={handleAddToCart}
        onLoadIntoCounter={handleLoadIntoCounter}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onClearCart={() => setCart([])}
      />
    </div>
  );
};
