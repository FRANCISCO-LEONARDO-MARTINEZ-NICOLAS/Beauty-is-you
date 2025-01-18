import React, { useState } from 'react';
import { Heart, ShoppingBag, Menu, X, Search, User, HelpCircle, Star,  HeartOff, Sparkles, Palette, Magnet as Magic, Brush, Droplet, Package } from 'lucide-react';

// Types
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  details: {
    ingredients: string[];
    howToUse: string[];
    benefits: string[];
  };
}

interface CartItem extends Product {
  quantity: number;
}

interface User {
  email: string;
  name: string;
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

interface GalleryImage {
  id: number;
  url: string;
  description: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [, setUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Categories
  const categories = [
    { id: 'labiales', name: 'Labiales', icon: <Magic className="h-5 w-5" /> },
    { id: 'sombras', name: 'Sombras', icon: <Palette className="h-5 w-5" /> },
    { id: 'bases', name: 'Bases', icon: <Droplet className="h-5 w-5" /> },
    { id: 'brochas', name: 'Brochas', icon: <Brush className="h-5 w-5" /> },
    { id: 'kits', name: 'Kits', icon: <Package className="h-5 w-5" /> },
  ];

  // Sample products data with categories
  const products: Product[] = [
    {
      id: 1,
      name: "Labial Kawaii Rose",
      description: "Labial de larga duración con brillo",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "labiales",
      details: {
        ingredients: ["Manteca de Karité", "Aceite de Jojoba", "Vitamina E"],
        howToUse: ["Aplicar desde el centro hacia afuera", "Para mayor duración, aplicar dos capas"],
        benefits: ["Hidratación prolongada", "No reseca los labios", "Larga duración"]
      }
    },
    {
      id: 2,
      name: "Sombras Pastel Dream",
      description: "Paleta de sombras en tonos pastel",
      price: 499.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80",
      category: "sombras",
      details: {
        ingredients: ["Pigmentos minerales", "Talco", "Mica"],
        howToUse: ["Aplicar con brocha limpia", "Difuminar suavemente", "Construir color gradualmente"],
        benefits: ["Alta pigmentación", "Fácil de difuminar", "No genera caída de producto"]
      }
    },
    {
      id: 3,
      name: "Base Mágica",
      description: "Base de maquillaje de cobertura total",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=500&q=80",
      category: "bases",
      details: {
        ingredients: ["Agua", "Pigmentos", "Vitamina C"],
        howToUse: ["Aplicar sobre piel limpia", "Difuminar con esponja o brocha", "Sellar con polvo"],
        benefits: ["Cobertura modulable", "No obstruye poros", "Larga duración"]
      }
    },
    {
      id: 4,
      name: "Kit Kawaii Complete",
      description: "Kit completo de maquillaje",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1512496015432-10a50d5d6b28?auto=format&fit=crop&w=500&q=80",
      category: "kits",
      details: {
        ingredients: ["Varios productos seleccionados"],
        howToUse: ["Seguir instrucciones de cada producto"],
        benefits: ["Todo lo necesario en un solo kit", "Productos complementarios", "Ahorro significativo"]
      }
    },
    {
      id: 5,
      name: "Set de Brochas Kawaii",
      description: "Set completo de brochas profesionales",
      price: 599.99,
      image: "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=500&q=80",
      category: "brochas",
      details: {
        ingredients: ["Fibras sintéticas de alta calidad"],
        howToUse: ["Lavar antes del primer uso", "Limpiar después de cada uso", "Secar en posición horizontal"],
        benefits: ["No maltrata la piel", "Fácil limpieza", "Durabilidad garantizada"]
      }
    }
  ];

  // Sample promotions data
  const promotions: Product[] = [
    {
      id: 6,
      name: "Labial Promoción",
      description: "Labial en promoción especial",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      category: "labiales",
      details: {
        ingredients: ["Manteca de Karité", "Aceite de Jojoba", "Vitamina E"],
        howToUse: ["Aplicar desde el centro hacia afuera", "Para mayor duración, aplicar dos capas"],
        benefits: ["Hidratación prolongada", "No reseca los labios", "Larga duración"]
      }
    },
    {
      id: 7,
      name: "Sombras Promoción",
      description: "Paleta de sombras en promoción",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80",
      category: "sombras",
      details: {
        ingredients: ["Pigmentos minerales", "Talco", "Mica"],
        howToUse: ["Aplicar con brocha limpia", "Difuminar suavemente", "Construir color gradualmente"],
        benefits: ["Alta pigmentación", "Fácil de difuminar", "No genera caída de producto"]
      }
    }
  ];

  // Sample gallery data
  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "Cliente satisfecho con su nuevo labial"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80",
      description: "Entrega de sombras pastel"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=500&q=80",
      description: "Cliente satisfecho con su nueva base"
    }
  ];

  // FAQ Data
  const faqs: FAQ[] = [
    {
      question: "¿Cómo coordino la entrega de mi pedido?",
      answer: "Una vez confirmado tu pedido, nos pondremos en contacto contigo para coordinar el punto de entrega en la línea del metro que te sea más conveniente.",
      category: "entregas"
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer: "Aceptamos efectivo al momento de la entrega y transferencias bancarias previas a la entrega.",
      category: "pagos"
    },
    {
      question: "¿Tienen política de devoluciones?",
      answer: "Aceptamos devoluciones dentro de los primeros 7 días si el producto está sin usar y en su empaque original.",
      category: "devoluciones"
    },
    {
      question: "¿Cómo sé qué tono de base elegir?",
      answer: "Puedes enviarnos una foto de tu rostro con luz natural y te ayudaremos a elegir el tono ideal para ti.",
      category: "productos"
    },
    {
      question: "¿Los productos son hipoalergénicos?",
      answer: "Sí, todos nuestros productos son hipoalergénicos y están dermatológicamente probados.",
      category: "productos"
    }
  ];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      const isInWishlist = prevWishlist.some(item => item.id === product.id);
      if (isInWishlist) {
        return prevWishlist.filter(item => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ email: "usuario@ejemplo.com", name: "Usuario" });
    setIsLoginOpen(false);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-pink-400" />
              <span className="ml-2 text-2xl font-bold text-pink-600 font-['Montserrat']">
                Andrea's Beauty
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-gray-600 hover:text-pink-500">Inicio</a>
              <a href="#productos" className="text-gray-600 hover:text-pink-500">Productos</a>
              <a href="#promociones" className="text-gray-600 hover:text-pink-500">Promociones</a>
              <a href="#galeria" className="text-gray-600 hover:text-pink-500">Galería</a>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-pink-100 rounded-full">
                <Search className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                className="p-2 hover:bg-pink-100 rounded-full relative"
                onClick={() => setIsLoginOpen(true)}
              >
                <User className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                className="p-2 hover:bg-pink-100 rounded-full relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5 text-gray-600" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>
              <button 
                className="p-2 hover:bg-pink-100 rounded-full relative"
                onClick={() => setIsWishlistOpen(true)}
              >
                <Heart className="h-5 w-5 text-gray-600" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button 
                className="md:hidden p-2 hover:bg-pink-100 rounded-full"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="p-4">
            <button 
              className="p-2 hover:bg-pink-100 rounded-full float-right"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
            <div className="clear-both pt-8 space-y-6">
              <a href="#inicio" className="block text-lg text-gray-600">Inicio</a>
              <a href="#productos" className="block text-lg text-gray-600">Productos</a>
              <a href="#promociones" className="block text-lg text-gray-600">Promociones</a>
              <a href="#galeria" className="block text-lg text-gray-600">Galería</a>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex-1 py-6 overflow-y-auto px-4">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Carrito de Compras</h2>
                    <button
                      className="ml-3 h-7 w-7 flex items-center justify-center"
                      onClick={() => setIsCartOpen(false)}
                    >
                      <X className="h-6 w-6 text-gray-400" />
                    </button>
                  </div>

                  <div className="mt-8">
                    {cart.length === 0 ? (
                      <p className="text-gray-500">Tu carrito está vacío</p>
                    ) : (
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {cart.map((item) => (
                            <li key={item.id} className="py-6 flex">
                              <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{item.name}</h3>
                                    <p className="ml-4">${item.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                </div>
                                <div className="flex-1 flex items-end justify-between text-sm">
                                  <p className="text-gray-500">Cantidad {item.quantity}</p>
                                  <button
                                    type="button"
                                    className="font-medium text-pink-600 hover:text-pink-500"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {cart.length > 0 && (
                  <div className="border-t border-gray-200 py-6 px-4">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Coordina la entrega en el metro</p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-pink-600 hover:bg-pink-700"
                      >
                        Confirmar Pedido
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Sidebar */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsWishlistOpen(false)} />
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex-1 py-6 overflow-y-auto px-4">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Lista de Deseos</h2>
                    <button
                      className="ml-3 h-7 w-7 flex items-center justify-center"
                      onClick={() => setIsWishlistOpen(false)}
                    >
                      <X className="h-6 w-6 text-gray-400" />
                    </button>
                  </div>

                  <div className="mt-8">
                    {wishlist.length === 0 ? (
                      <p className="text-gray-500">Tu lista de deseos está vacía</p>
                    ) : (
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {wishlist.map((item) => (
                            <li key={item.id} className="py-6 flex">
                              <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{item.name}</h3>
                                    <p className="ml-4">${item.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                </div>
                                <div className="flex-1 flex items-end justify-between text-sm">
                                  <button
                                    type="button"
                                    className="font-medium text-pink-600 hover:text-pink-500"
                                    onClick={() => toggleWishlist(item)}
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsLoginOpen(false)} />
            <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
              <div className="absolute top-4 right-4">
                <button onClick={() => setIsLoginOpen(false)}>
                  <X className="h-6 w-6 text-gray-400" />
                </button>
              </div>
              <div className="text-center mb-6">
                <Heart className="h-12 w-12 text-pink-400 mx-auto" />
                <h2 className="mt-4 text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Iniciar Sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {isFAQOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsFAQOpen(false)} />
            <div className="relative bg-white rounded-lg p-8 max-w-2xl w-full">
              <div className="absolute top-4 right-4">
                <button onClick={() => setIsFAQOpen(false)}>
                  <X className="h-6 w-6 text-gray-400" />
                </button>
              </div>
              <div className="text-center mb-6">
                <HelpCircle className="h-12 w-12 text-pink-400 mx-auto" />
                <h2 className="mt-4 text-2xl font-bold text-gray-900">Preguntas Frecuentes</h2>
              </div>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-pink-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                    <span className="inline-block mt-2 text-sm text-pink-600 bg-pink-100 px-2 py-1 rounded-full">
                      {faq.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedProduct(null)} />
            <div className="relative bg-white rounded-lg max-w-4xl w-full">
              <div className="absolute top-4 right-4">
                <button onClick={() => setSelectedProduct(null)}>
                  <X className="h-6 w-6 text-gray-400" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-96">
                  <img 
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="absolute inset-0 w-full h-full object-cover rounded-l-lg"
                  />
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h2>
                  <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                  <p className="text-3xl font-bold text-pink-600 mb-6">${selectedProduct.price}</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Ingredientes</h3>
                      <ul className="list-disc list-inside text-gray-600">
                        {selectedProduct.details.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Modo de Uso</h3>
                      <ul className="list-disc list-inside text-gray-600">
                        {selectedProduct.details.howToUse.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Beneficios</h3>
                      <ul className="list-disc list-inside text-gray-600">
                        {selectedProduct.details.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex space-x-4">
                    <button
                      onClick={() => addToCart(selectedProduct)}
                      className="flex-1 bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-colors flex items-center justify-center"
                    >
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Agregar al Carrito
                    </button>
                    <button
                      onClick={() => toggleWishlist(selectedProduct)}
                      className="p-3 border border-pink-600 text-pink-600 rounded-full hover:bg-pink-50 transition-colors"
                    >
                      {wishlist.some(item => item.id === selectedProduct.id) ? (
                        <HeartOff className="h-5 w-5" />
                      ) : (
                        <Heart className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div id="inicio" className="pt-16">
        <div className="relative bg-gradient-to-r from-pink-100 to-pink-200 h-[500px]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1487&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSI1IiBmaWxsPSJyZ2JhKDIzNiwgNzIsIDE1MywgMC4xKSIvPjwvc3ZnPg==')] bg-repeat opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
            <div className="flex items-center space-x-4 mb-8">
              <Heart className="h-12 w-12 text-pink-400" />
              <Star className="h-8 w-8 text-pink-300" />
              <Heart className="h-10 w-10 text-pink-400" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-pink-800 sm:text-5xl lg:text-6xl">
              Belleza y Ternura
            </h1>
            <p className="mt-6 text-xl text-pink-700 max-w-3xl">
              Descubre nuestra colección exclusiva de maquillaje. Productos de alta calidad con el toque kawaii que tanto te gusta.
            </p>
            <div className="mt-10">
              <a href="#productos" className="inline-block bg-pink-500 px-8 py-3 text-white font-medium rounded-full hover:bg-pink-600 transition-colors">
                Ver Productos
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-600 hover:bg-pink-100'
            }`}
          >
            <Sparkles className="h-5 w-5" />
            <span>Todos</span>
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-pink-100'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div id="productos" className="max-w-7xl mx-auto px-4 py-16 bg-pink-50">
        <div className="flex items-center mb-8">
          <Star className="h-8 w-8 text-pink-400 mr-4" />
          <h2 className="text-3xl font-bold text-gray-800">Productos Destacados</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {filteredProducts.map((product) => (
    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => setSelectedProduct(product)}
        />
        <button 
          onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition-colors"
        >
          <Heart className={`h-5 w-5 ${
            wishlist.some(item => item.id === product.id)
              ? 'text-pink-500 fill-current'
              : 'text-gray-400'
          }`} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 cursor-pointer" onClick={() => setSelectedProduct(product)}>
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-pink-600 font-bold">${product.price}</span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-600 transition-colors flex items-center"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Agregar
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

      {/* Promotions Section */}
      <div id="promociones" className="max-w-7xl mx-auto px-4 py-16 bg-pink-50">
        <div className="flex items-center mb-8">
          <Star className="h-8 w-8 text-pink-400 mr-4" />
          <h2 className="text-3xl font-bold text-gray-800">Promociones</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promotions.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                />
                <button 
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition-colors"
                >
                  <Heart className={`h-5 w-5 ${
                    wishlist.some(item => item.id === product.id)
                      ? 'text-pink-500 fill-current'
                      : 'text-gray-400'
                  }`} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-pink-600 font-bold">${product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-600 transition-colors flex items-center"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <div id="galeria" className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center mb-8">
          <Star className="h-8 w-8 text-pink-400 mr-4" />
          <h2 className="text-3xl font-bold text-gray-800">Galería</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={image.url}
                alt={image.description}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-600 text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Button */}
      <button 
        onClick={() => setIsFAQOpen(true)}
        className="fixed bottom-6 right-6 bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 transition-colors"
      >
        <HelpCircle className="h-6 w-6" />
      </button>

      {/* Kawaii Decorative Elements */}
      <div className="fixed top-1/4 left-4 hidden lg:block">
        <div className="space-y-4">
          <Heart className="h-6 w-6 text-pink-300 animate-bounce" />
          <Star className="h-5 w-5 text-pink-200 animate-pulse" />
          <Heart className="h-4 w-4 text-pink-300 animate-bounce" />
        </div>
      </div>
      <div className="fixed top-1/3 right-4 hidden lg:block">
        <div className="space-y-4">
          <Star className="h-6 w-6 text-pink-300 animate-pulse" />
          <Heart className="h-5 w-5 text-pink-200 animate-bounce" />
          <Star className="h-4 w-4 text-pink-300 animate-pulse" />
        </div>
      </div>
    </div>
    </div>
  );
}


export default App;