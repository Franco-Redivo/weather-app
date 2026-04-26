

const Videos =({data}) => {
    const videos = data.videos || [];
    
    if (videos.length === 0) {
        return null;
    }

    return (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/30 backdrop-blur">
            <h2 className="text-lg font-semibold text-white">Videos</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((video, index) => (
                    <div key={index} className="rounded-2xl bg-slate-800/50 p-2 shadow-md shadow-slate-950/20">
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="h-auto w-full rounded-xl object-cover"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Videos;