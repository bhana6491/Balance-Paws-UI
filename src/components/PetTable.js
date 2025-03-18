import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
export const PetTable = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        // Fetch pets JSON from local storage
        const petsData = sessionStorage.getItem('pets');
        if (petsData) {
            setPets(JSON.parse(petsData));
        }
    }, []);

    const getEmojiForSpecies = (species) => {
        console.log(species)
        return '🐶';
        if (species.toLowerCase() === 'dog') return '🐶';
        if (species.toLowerCase() === 'cat') return '🐱';
        return '';
    };

    return (
        <div>
            {/* <h3>Pet Table</h3>
            <Table
                dataSource={pets.map((pet, index) => ({ ...pet, key: index }))}
                columns={[
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'Species',
                        dataIndex: 'species',
                        key: 'species',
                    },
                    {
                        title: 'Emoji',
                        key: 'emoji',
                        render: (_, record) => getEmojiForSpecies(record.species),
                    },
                ]}
                bordered
            />
            <h3>JSON Data:</h3>
            <pre>{JSON.stringify(pets, null, 2)}</pre> */}
        </div>
    );
};

export default PetTable;