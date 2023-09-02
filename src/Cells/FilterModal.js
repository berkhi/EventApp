import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const FilterModal = ({ visible, onClose, categoryOptions, locationOptions, applyFilters }) => {
    const [activeTab, setActiveTab] = useState("Kategori Seç")
    const [selectedCategory, setSelectedCategory] = useState("Hepsi");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedLocation, setSelectedLocation] = useState("Tüm Türkiye");

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setActiveTab("Tarih Seç")
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setActiveTab("Yer")
    };

    const handleLocationSelect = (location) => {
        setSelectedLocation(location)
    };


    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[
                                styles.tabButton,
                                activeTab === "Kategori Seç" ? styles.activeTab : null,
                            ]}
                            onPress={() => setActiveTab("Kategori Seç")}
                        >
                            <Text style={styles.tabButtonText}>Kategori Seç</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.tabButton,
                                activeTab === "Tarih Seç" ? styles.activeTab : null,
                            ]}
                            onPress={() => setActiveTab("Tarih Seç")}
                        >
                            <Text style={styles.tabButtonText}>Tarih Seç</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.tabButton,
                                activeTab === "Yer" ? styles.activeTab : null,
                            ]}
                            onPress={() => setActiveTab("Yer")}
                        >
                            <Text style={styles.tabButtonText}>Yer</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.optionContainer}>
                        {activeTab === "Kategori Seç" && (
                            categoryOptions?.map((option, index) => (
                                <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleCategorySelect(option)}>
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))
                        )}

                        {activeTab === "Tarih Seç" && (
                            <View style={styles.optionContainer}>
                                <DateTimePicker
                                    value={selectedDate}
                                    mode="date"
                                    display="default"
                                    // minimumDate={new Date()}
                                    onChange={(event, date) => {
                                        console.log('SEÇTİĞİM DATE', date)
                                        handleDateSelect(date)
                                    }}
                                />
                            </View>
                        )}

                        {activeTab === "Yer" && (
                            locationOptions.map((option, index) => (
                                <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleLocationSelect(option)}>
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.applyButton} onPress={() => applyFilters(selectedCategory, selectedDate, selectedLocation)}>
                            <Text style={styles.applyButtonText}>Apply Filters</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderColor: '#007bff',
    },
    tabButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    optionContainer: {
        marginBottom: 20,
    },
    optionButton: {
        paddingVertical: 10,
    },
    optionText: {
        fontSize: 14,
        color: '#333',
    },
    modalButtons: {
        flexDirection: 'row',
        alignContent: 'center',
        marginLeft: 20,
    },
    applyButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
    },
    applyButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: 'lightgray',
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 5,
    },
    cancelButtonText: {
        fontWeight: 'bold',
    },
});

export default FilterModal;
