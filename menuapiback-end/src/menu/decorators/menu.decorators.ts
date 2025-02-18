import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger'
import CreateMenuDto from '../dtos/create-menu.dto'
import UpdateMenuDto from '../dtos/update-menu.dto'
import MenuResponse from '../responses/menu.response'
import MenuListResponse from '../responses/menu-list.response'

export const GetAllMenusSwaggerDefinition = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get all menus' }),
    ApiResponse({
      status: 200,
      description: 'Menus fetched successfully',
      type: MenuListResponse,
    }),
    ApiBadRequestResponse({
      status: 400,
      description: 'Invalid query parameters. Ensure valid UUIDs if provided.',
    }),
    ApiInternalServerErrorResponse({
      status: 500,
      description: 'Something went wrong while fetching menus.',
    }),
  )

export const GetMenuByIdSwaggerDefinition = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get a menu by ID' }),
    ApiParam({
      name: 'id',
      description: 'UUID of the menu to fetch',
      example: 'fbeec707-3d6f-41bb-9dec-63d5a24c957d',
    }),
    ApiResponse({
      status: 200,
      description: 'Menu retrieved successfully',
      type: MenuResponse,
    }),
    ApiBadRequestResponse({
      status: 400,
      description: 'Invalid menu ID format. Must be a valid UUID.',
    }),
    ApiInternalServerErrorResponse({
      status: 500,
      description: 'Something went wrong while fetching the menu.',
    }),
  )

export const CreateMenuSwaggerDefinition = () =>
  applyDecorators(
    ApiOperation({ summary: 'Create a new menu' }),
    ApiBody({
      type: CreateMenuDto,
      description: 'Payload for creating a menu',
      examples: {
        default: {
          summary: 'Example Request',
          value: {
            name: 'New Menu',
            parentId: null,
            depth: 1,
            order: 2,
          },
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'Menu created successfully',
      type: MenuResponse,
    }),
    ApiBadRequestResponse({
      status: 400,
      description: 'Invalid request body. Ensure required fields are valid.',
    }),
    ApiInternalServerErrorResponse({
      status: 500,
      description: 'Something went wrong while creating the menu.',
    }),
  )

export const UpdateMenuSwaggerDefinition = () =>
  applyDecorators(
    ApiOperation({ summary: 'Update a menu' }),
    ApiParam({
      name: 'id',
      description: 'UUID of the menu to update',
      example: 'fbeec707-3d6f-41bb-9dec-63d5a24c957d',
    }),
    ApiBody({
      type: UpdateMenuDto,
      description: 'Payload for updating a menu',
      examples: {
        default: {
          summary: 'Example Update',
          value: {
            name: 'Updated Menu Name',
            parentId: 'fbeec707-3d6f-41bb-9dec-63d5a24c957d',
            order: 3,
          },
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'Menu updated successfully',
      type: MenuResponse,
    }),
    ApiBadRequestResponse({
      status: 400,
      description: 'Invalid request body or menu ID. Must be a valid UUID.',
    }),
    ApiInternalServerErrorResponse({
      status: 500,
      description: 'Something went wrong while updating the menu.',
    }),
  )

export const DeleteMenuSwaggerDefinition = () =>
  applyDecorators(
    ApiOperation({ summary: 'Soft delete a menu' }),
    ApiParam({
      name: 'id',
      description: 'UUID of the menu to delete',
      example: 'fbeec707-3d6f-41bb-9dec-63d5a24c957d',
    }),
    ApiResponse({
      status: 200,
      description: 'Menu deleted successfully',
    }),
    ApiBadRequestResponse({
      status: 400,
      description: 'Invalid menu ID. Must be a valid UUID.',
    }),
    ApiInternalServerErrorResponse({
      status: 500,
      description: 'Something went wrong while deleting the menu.',
    }),
  )
