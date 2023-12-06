import React, { useState } from 'react';


const PictoCalories = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [showTable, setShowTable] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFile(event.target.files[0]);

    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setShowTable(true);

    }
  };

  return (
    <div>
      {<h1>Snap a Pic of Your Meal!</h1>}
      <div>
      <h1>Your Header Here</h1>
      <input type="file" onChange={handleFileChange} />
      {showTable && (
        <table>
          <thead>
            <tr>
              <th>Mixed Spring Greens</th>
              <th>Tomatoes</th>
              <th>Pecan Nuts</th>
              <th>Feta Cheese</th>
              <th>Pesto Sauce</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10</td>
              <td>20</td>
              <td>40</td>
              <td>180</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>


    </div>
  );
};

export default PictoCalories;