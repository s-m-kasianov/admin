import { ref, computed } from '@vue/composition-api';
import '@/loaders/composition';
import axios from '@/loaders/axios';
import api from '@/api';

const category = ref({
  images: []
});
const categories = ref([]);
const error = ref(null);
const isLoading = ref(false);
const isSaved = ref(true);

export default function () {
  const parentCategories = computed(() => [
    { 'id': 0, 'title': '[root]' },
    ...categories.value.filter((el) => el.is_parent)
  ]);

  async function fetchCategory (id) {
    setLoading(true);
    try {
      const { data } = await axios(api.fetchCategory(id));
      category.value = data;
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function storeCategory (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.storeCategory(payload));
      Object.assign(category.value, data);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function updateCategory (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.updateCategory(payload.id, payload));
      Object.assign(category.value, data);
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function fetchCategories () {
    setLoading(true);
    try {
      const { data } = await axios(api.fetchCategories());
      categories.value = data;
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function updateCategoriesRow (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.updateCategory(payload.id, payload));
      categories.value = categories.value.map((el) => {
        return el.id === payload.id ? Object.assign(el, data) : el;
      });
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  async function removeCategoriesRow (payload) {
    setLoading(true);
    try {
      const { data } = await axios(api.deleteCategory(payload.id));
      categories.value = categories.value
        .filter((el) => el.id !== data.id)
        .map((el) => {
          if (el.parent_id === payload.parent_id && el.ord > payload.ord) {
            el.ord--;
          }
          return el;
        });
    } catch (error) {
      throw error;
    }
    setLoading(false);
  }

  return {
    category: computed(() => category.value),
    categories: computed(() => categories.value),
    parentCategories,
    error,
    isLoading,
    isSaved,
    fetchCategory,
    storeCategory,
    updateCategory,
    fetchCategories,
    updateCategoriesRow,
    removeCategoriesRow
  };
}

function setLoading (value) {
  isLoading.value = value;
  isSaved.value = !value;
}
