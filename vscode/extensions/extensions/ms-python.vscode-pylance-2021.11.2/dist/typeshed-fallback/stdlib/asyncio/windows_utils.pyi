import sys
from _typeshed import Self
from types import TracebackType
from typing import Callable, Protocol, Type

class _WarnFunction(Protocol):
    def __call__(self, message: str, category: Type[Warning] = ..., stacklevel: int = ..., source: PipeHandle = ...) -> None: ...

BUFSIZE: int
PIPE: int
STDOUT: int

def pipe(*, duplex: bool = ..., overlapped: tuple[bool, bool] = ..., bufsize: int = ...) -> tuple[int, int]: ...

class PipeHandle:
    def __init__(self, handle: int) -> None: ...
    def __repr__(self) -> str: ...
    if sys.version_info >= (3, 8):
        def __del__(self, _warn: _WarnFunction = ...) -> None: ...
    else:
        def __del__(self) -> None: ...
    def __enter__(self: Self) -> Self: ...
    def __exit__(self, t: type | None, v: BaseException | None, tb: TracebackType | None) -> None: ...
    @property
    def handle(self) -> int: ...
    def fileno(self) -> int: ...
    def close(self, *, CloseHandle: Callable[[int], None] = ...) -> None: ...
