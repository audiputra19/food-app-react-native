import AsyncStorage from '@react-native-async-storage/async-storage';

const SEARCH_HISTORY_KEY = 'search_history';

export const saveSearchHistory = async (history: string[]) => {
    try {
        await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
    }
    catch(err){
        console.error('Error saving search history:', err);
    }
}

export const getSearchHistory = async (): Promise<string[]> => {
    try{
        const history = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
        return history ? JSON.parse(history) : [];
    }
    catch (err){
        console.error('Error fetching search history:', err);
        return [];
    }
}