import React from 'react';

function Component(props) {
  const { data } = props;

  return (
    <table>
      <thead>
        <th>Component</th>
        <th>Location</th>
        <th>Prop Configuration</th>
      </thead>
      <tbody>
        {data.map(entry => {
          return (
            <tr>
              <td>{entry.name}</td>
              <td>
                {entry.fileName}:{entry.ln}
              </td>
              <td>{entry.props.map(prop => prop.name).join(", ")}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Component;