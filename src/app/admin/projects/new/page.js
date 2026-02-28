'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function NewProjectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    projectName: '',
    description: '',
    projectDate: '',
    tags: '',
    link: '',
    technology: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [carouselFiles, setCarouselFiles] = useState([]);
  const [mainPreviewUrl, setMainPreviewUrl] = useState(null);
  const [carouselPreviewUrls, setCarouselPreviewUrls] = useState([]);

  useEffect(() => {
    if (!imageFile) {
      if (mainPreviewUrl) URL.revokeObjectURL(mainPreviewUrl);
      setMainPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setMainPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  useEffect(() => {
    carouselPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    if (!carouselFiles.length) {
      setCarouselPreviewUrls([]);
      return;
    }
    const urls = carouselFiles.map((f) => URL.createObjectURL(f));
    setCarouselPreviewUrls(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [carouselFiles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.projectName.trim() || !form.description.trim()) {
      setError('Project name and description are required.');
      return;
    }
    if (!imageFile) {
      setError('Please select a main image.');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('projectName', form.projectName.trim());
      formData.append('description', form.description.trim());
      if (form.projectDate) formData.append('projectDate', form.projectDate);
      formData.append('link', form.link.trim());
      formData.append('tags', form.tags.trim() ? JSON.stringify(form.tags.split(',').map((s) => s.trim()).filter(Boolean)) : '[]');
      formData.append('technology', form.technology.trim() ? JSON.stringify(form.technology.split(',').map((s) => s.trim()).filter(Boolean)) : '[]');
      formData.append('image', imageFile);
      carouselFiles.forEach((file) => formData.append('carouselImages', file));

      const res = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create project');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-content bg-white">
      <div className="dlab-bnr-inr overlay-primary" style={{ backgroundImage: 'url(/images/background/banner_1.png)' }}>
        <div className="container">
          <div className="dlab-bnr-inr-entry">
            <h1 className="text-white">New Project</h1>
          </div>
        </div>
      </div>
      <div className="section-full content-inner">
        <div className="">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="p-a30 ">
                <Link href="/admin" className="site-button outline button-sm m-b20">
                  ← Back to Admin
                </Link>
                <h2 className="font-weight-700 m-t0 m-b20">Create new project</h2>
                {error && <p className="text-danger m-b15">{error}</p>}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="font-weight-700">Project name *</label>
                    <input
                      type="text"
                      name="projectName"
                      className="form-control"
                      placeholder="e.g. Project Name"
                      value={form.projectName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="font-weight-700">Description *</label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows={5}
                      placeholder="Project description"
                      value={form.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="font-weight-700">Tags (comma-separated)</label>
                    <input
                      type="text"
                      name="tags"
                      className="form-control"
                      placeholder="e.g. WebGIS, React JS, Leaflet"
                      value={form.tags}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="font-weight-700">Project date (optional)</label>
                    <input
                      type="date"
                      name="projectDate"
                      className="form-control"
                      value={form.projectDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="font-weight-700">Project URL</label>
                    <input
                      type="url"
                      name="link"
                      className="form-control"
                      placeholder="https://..."
                      value={form.link}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="font-weight-700">Technology (comma-separated)</label>
                    <input
                      type="text"
                      name="technology"
                      className="form-control"
                      placeholder="e.g. React JS, Leaflet JS"
                      value={form.technology}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="font-weight-700">Main image *</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      required
                    />
                    {mainPreviewUrl && (
                      <div className="m-t15">
                        <p className="text-muted small m-b5">Preview:</p>
                        <div className="border p-a10 bg-gray" style={{ maxWidth: 280 }}>
                          <Image src={mainPreviewUrl} alt="Main" width={260} height={160} style={{ width: '100%', height: 'auto' }} unoptimized />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label className="font-weight-700">Carousel images (optional, multiple)</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="form-control"
                      onChange={(e) => setCarouselFiles(Array.from(e.target.files || []))}
                    />
                    {carouselPreviewUrls.length > 0 && (
                      <div className="m-t15">
                        <p className="text-muted small m-b5">Previews:</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                          {carouselPreviewUrls.map((url, i) => (
                            <div key={i} className="border p-a10 bg-gray" style={{ maxWidth: 160 }}>
                              <Image src={url} alt={`Carousel ${i + 1}`} width={140} height={90} style={{ width: '100%', height: 'auto' }} unoptimized />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="form-group m-t20">
                    <button
                      type="submit"
                      className="site-button button-lg radius-no"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating...' : 'Create project'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
