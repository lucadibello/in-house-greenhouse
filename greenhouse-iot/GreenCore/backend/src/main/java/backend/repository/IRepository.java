package backend.repository;

import backend.exception.ProxyRequestFailException;

public interface IRepository {
    void load() throws ProxyRequestFailException;
}
