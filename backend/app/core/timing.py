import time
import functools


def timed(name, fn):
    @functools.wraps(fn)
    def wrapper(state):
        start = time.time()
        print(f"[TIMER] {name} started", flush=True)
        try:
            result = fn(state)
        except Exception as e:
            print(f"[TIMER] {name} FAILED after {time.time() - start:.1f}s -> {type(e).__name__}: {e}", flush=True)
            raise
        print(f"[TIMER] {name} finished in {time.time() - start:.1f}s", flush=True)
        return result
    return wrapper