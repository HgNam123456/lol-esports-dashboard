# placeholder
# backend/app/schemas/common.py
from pydantic import BaseModel
from typing import Generic, TypeVar, List, Optional

T = TypeVar("T")

class Pagination(BaseModel):
    page: int
    size: int
    total: int

class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    pagination: Pagination
