import { gql } from '@apollo/client';

export const GET_SHIPMENTS = gql`
  query Shipments($page: Int!, $size: Int!) {
    shipments(page: $page, size: $size) {
      totalCount
      data {
        id
        shipmentNumber
        origin
        destination
        status
        carrier
        weight
      }
    }
  }
`;

export const ADD_SHIPMENT = gql`
  mutation AddShipment($inputShipmentNumber: String!, $origin: String!, $destination: String!, $status: String!, $carrier: String!, $weight: Float!) {
    addShipment(
      shipmentNumber: $inputShipmentNumber,
      origin: $origin,
      destination: $destination,
      status: $status,
      carrier: $carrier,
      weight: $weight
    ) {
      id
      createdAt
    }
  }
`;

export const UPDATE_SHIPMENT = gql`
  mutation UpdateShipment($id: ID!, $status: String, $carrier: String) {
    updateShipment(id: $id, status: $status, carrier: $carrier) {
      id
      shipmentNumber
      status
      carrier
    }
  }
`;

// Note: backend does not expose deleteShipment in schema; frontend will handle deletes locally or via update.

export const DELETE_SHIPMENT = gql`
  mutation DeleteShipment($id: ID!) {
    deleteShipment(id: $id)
  }
`;

