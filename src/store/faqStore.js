import { create } from 'zustand';

const useFaqStore = create((set, get) => ({
  faqs: [],
  loading: false,
  error: null,
  
  fetchFaqs: async () => {
    try {
      set({ loading: true });
      const response = await fetch('/faq.json');
      const data = await response.json();
      set({ faqs: data.faqs, loading: false, error: null });
    } catch (error) {
      set({ error: 'Failed to load FAQs', loading: false });
    }
  },

  saveFaqs: async (faqs) => {
    try {
      set({ loading: true });
      const response = await fetch('/faq-manager.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ faqs }),
      });
      
      if (!response.ok) throw new Error('Failed to save FAQs');
      
      set({ faqs, loading: false, error: null });
      return true;
    } catch (error) {
      set({ error: 'Failed to save FAQs', loading: false });
      return false;
    }
  },

  addFaq: async (faq) => {
    const newFaqs = [...get().faqs, faq];
    const success = await get().saveFaqs(newFaqs);
    if (success) {
      set({ faqs: newFaqs });
    }
  },

  updateFaq: async (updatedFaq) => {
    const newFaqs = get().faqs.map((faq) => 
      faq.id === updatedFaq.id ? updatedFaq : faq
    );
    const success = await get().saveFaqs(newFaqs);
    if (success) {
      set({ faqs: newFaqs });
    }
  },

  deleteFaq: async (id) => {
    const newFaqs = get().faqs.filter((faq) => faq.id !== id);
    const success = await get().saveFaqs(newFaqs);
    if (success) {
      set({ faqs: newFaqs });
    }
  },

  reorderFaqs: async (sourceIndex, destinationIndex) => {
    const faqs = [...get().faqs];
    const [removed] = faqs.splice(sourceIndex, 1);
    faqs.splice(destinationIndex, 0, removed);
    
    const success = await get().saveFaqs(faqs);
    if (success) {
      set({ faqs });
    }
  }
}));

export default useFaqStore;